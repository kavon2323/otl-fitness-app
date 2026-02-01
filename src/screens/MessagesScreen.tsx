import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../store/authStore';
import { useMessageStore } from '../store/messageStore';
import { colors, spacing, typography, borderRadius } from '../theme';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
}

interface MessagesScreenProps {
  onBack: () => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({ onBack }) => {
  const { user } = useAuthStore();
  const { conversations, loadConversations, markAsRead, isLoading } = useMessageStore();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [otherUserName, setOtherUserName] = useState<string>('');

  useEffect(() => {
    if (user?.id) {
      loadConversations(user.id);
    }
  }, [user?.id]);

  const loadMessages = async (conversationId: string) => {
    setLoadingMessages(true);
    setSelectedConversationId(conversationId);

    // Get the other user's name
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation && user?.id) {
      const otherId = conversation.coachId === user.id ? conversation.clientId : conversation.coachId;
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('display_name, email')
        .eq('id', otherId)
        .single();

      setOtherUserName(profile?.display_name || profile?.email || 'Unknown');
    }

    // Load messages
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data.map(m => ({
        id: m.id,
        conversationId: m.conversation_id,
        senderId: m.sender_id,
        content: m.content,
        createdAt: m.created_at,
        readAt: m.read_at,
      })));

      // Mark messages as read
      if (user?.id) {
        markAsRead(conversationId, user.id);
      }
    }

    setLoadingMessages(false);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversationId || !user?.id) return;

    setSending(true);
    const content = newMessage.trim();
    setNewMessage('');

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: selectedConversationId,
        sender_id: user.id,
        content,
      })
      .select()
      .single();

    if (!error && data) {
      setMessages(prev => [...prev, {
        id: data.id,
        conversationId: data.conversation_id,
        senderId: data.sender_id,
        content: data.content,
        createdAt: data.created_at,
        readAt: data.read_at,
      }]);

      // Update conversation's updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', selectedConversationId);
    }

    setSending(false);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  // Render conversation list
  if (!selectedConversationId) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Messages</Text>
          <View style={styles.headerRight} />
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : conversations.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" size={64} color={colors.textMuted} />
            <Text style={styles.emptyTitle}>No Messages Yet</Text>
            <Text style={styles.emptyText}>
              Messages from your coach will appear here
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.conversationList}>
            {conversations.map((conv) => (
              <TouchableOpacity
                key={conv.id}
                style={styles.conversationItem}
                onPress={() => loadMessages(conv.id)}
              >
                <View style={styles.avatarContainer}>
                  <Ionicons name="person-circle" size={48} color={colors.primary} />
                  {(conv.unreadCount || 0) > 0 && (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadBadgeText}>{conv.unreadCount}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.conversationContent}>
                  <Text style={styles.conversationName}>
                    {user?.id === conv.coachId ? 'Client' : 'Coach'}
                  </Text>
                  {conv.lastMessage && (
                    <Text style={styles.lastMessage} numberOfLines={1}>
                      {conv.lastMessage.content}
                    </Text>
                  )}
                </View>
                {conv.lastMessage && (
                  <Text style={styles.messageTime}>
                    {formatTime(conv.lastMessage.createdAt)}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    );
  }

  // Render chat view
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={0}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setSelectedConversationId(null)} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>{otherUserName}</Text>
        <View style={styles.headerRight} />
      </View>

      {loadingMessages ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.map((message) => {
              const isMe = message.senderId === user?.id;
              return (
                <View
                  key={message.id}
                  style={[
                    styles.messageBubble,
                    isMe ? styles.myMessage : styles.theirMessage,
                  ]}
                >
                  <Text style={[
                    styles.messageText,
                    isMe ? styles.myMessageText : styles.theirMessageText,
                  ]}>
                    {message.content}
                  </Text>
                  <Text style={[
                    styles.messageTimeSmall,
                    isMe ? styles.myMessageTime : styles.theirMessageTime,
                  ]}>
                    {formatTime(message.createdAt)}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor={colors.textMuted}
              multiline
              maxLength={1000}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                (!newMessage.trim() || sending) && styles.sendButtonDisabled,
              ]}
              onPress={sendMessage}
              disabled={!newMessage.trim() || sending}
            >
              {sending ? (
                <ActivityIndicator size="small" color={colors.text} />
              ) : (
                <Ionicons name="send" size={20} color={colors.text} />
              )}
            </TouchableOpacity>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing['5xl'],
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  headerRight: {
    width: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing['2xl'],
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginTop: spacing.lg,
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  conversationList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  avatarContainer: {
    position: 'relative',
  },
  unreadBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  unreadBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  conversationContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
  conversationName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  lastMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  messageTime: {
    fontSize: typography.fontSize.xs,
    color: colors.textMuted,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
  },
  messageText: {
    fontSize: typography.fontSize.base,
    lineHeight: 22,
  },
  myMessageText: {
    color: '#000',
  },
  theirMessageText: {
    color: colors.text,
  },
  messageTimeSmall: {
    fontSize: typography.fontSize.xs,
    marginTop: 4,
  },
  myMessageTime: {
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'right',
  },
  theirMessageTime: {
    color: colors.textMuted,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.text,
    maxHeight: 100,
    marginRight: spacing.sm,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});

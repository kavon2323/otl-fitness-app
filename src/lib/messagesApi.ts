import { supabase } from './supabase';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  createdAt: string;
  readAt: string | null;
}

export interface Conversation {
  id: string;
  coachId: string;
  clientId: string;
  createdAt: string;
  updatedAt: string;
  lastMessage?: Message;
  unreadCount?: number;
}

// Fetch unread message count for a user
export const fetchUnreadMessageCount = async (userId: string): Promise<number> => {
  try {
    // First, get all conversations where user is a participant
    const { data: conversations, error: convError } = await supabase
      .from('conversations')
      .select('id')
      .or(`coach_id.eq.${userId},client_id.eq.${userId}`);

    if (convError || !conversations || conversations.length === 0) {
      return 0;
    }

    const conversationIds = conversations.map(c => c.id);

    // Count unread messages (not sent by user, not read yet)
    const { count, error: msgError } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .in('conversation_id', conversationIds)
      .neq('sender_id', userId)
      .is('read_at', null);

    if (msgError) {
      console.error('Error fetching unread count:', msgError);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error('Error in fetchUnreadMessageCount:', error);
    return 0;
  }
};

// Fetch conversations for a user with unread counts
export const fetchConversations = async (userId: string): Promise<Conversation[]> => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        messages (
          id,
          content,
          sender_id,
          created_at,
          read_at
        )
      `)
      .or(`coach_id.eq.${userId},client_id.eq.${userId}`)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }

    return (data || []).map(conv => {
      const messages = conv.messages || [];
      const unreadMessages = messages.filter(
        (m: any) => m.sender_id !== userId && !m.read_at
      );
      const lastMessage = messages.sort(
        (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];

      return {
        id: conv.id,
        coachId: conv.coach_id,
        clientId: conv.client_id,
        createdAt: conv.created_at,
        updatedAt: conv.updated_at,
        unreadCount: unreadMessages.length,
        lastMessage: lastMessage ? {
          id: lastMessage.id,
          conversationId: conv.id,
          senderId: lastMessage.sender_id,
          content: lastMessage.content,
          createdAt: lastMessage.created_at,
          readAt: lastMessage.read_at,
        } : undefined,
      };
    });
  } catch (error) {
    console.error('Error in fetchConversations:', error);
    return [];
  }
};

// Mark messages as read
export const markMessagesAsRead = async (
  conversationId: string,
  userId: string
): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', conversationId)
      .neq('sender_id', userId)
      .is('read_at', null);

    if (error) {
      console.error('Error marking messages as read:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in markMessagesAsRead:', error);
    return false;
  }
};

// Send a message
export const sendMessage = async (
  conversationId: string,
  senderId: string,
  content: string
): Promise<Message | null> => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        content,
      })
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      return null;
    }

    // Update conversation's updated_at
    await supabase
      .from('conversations')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', conversationId);

    return {
      id: data.id,
      conversationId: data.conversation_id,
      senderId: data.sender_id,
      content: data.content,
      createdAt: data.created_at,
      readAt: data.read_at,
    };
  } catch (error) {
    console.error('Error in sendMessage:', error);
    return null;
  }
};

// Get or create a conversation between coach and client
export const getOrCreateConversation = async (
  coachId: string,
  clientId: string
): Promise<Conversation | null> => {
  try {
    // Try to find existing conversation
    const { data: existing, error: findError } = await supabase
      .from('conversations')
      .select('*')
      .eq('coach_id', coachId)
      .eq('client_id', clientId)
      .single();

    if (existing) {
      return {
        id: existing.id,
        coachId: existing.coach_id,
        clientId: existing.client_id,
        createdAt: existing.created_at,
        updatedAt: existing.updated_at,
      };
    }

    // Create new conversation
    const { data, error } = await supabase
      .from('conversations')
      .insert({
        coach_id: coachId,
        client_id: clientId,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating conversation:', error);
      return null;
    }

    return {
      id: data.id,
      coachId: data.coach_id,
      clientId: data.client_id,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error in getOrCreateConversation:', error);
    return null;
  }
};

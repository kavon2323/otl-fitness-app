import { create } from 'zustand';
import {
  fetchUnreadMessageCount,
  fetchConversations,
  markMessagesAsRead,
  sendMessage,
  getOrCreateConversation,
  Message,
  Conversation,
} from '../lib/messagesApi';

interface MessageState {
  // State
  unreadCount: number;
  conversations: Conversation[];
  isLoading: boolean;
  lastFetched: number | null;

  // Actions
  loadUnreadCount: (userId: string) => Promise<void>;
  loadConversations: (userId: string) => Promise<void>;
  markAsRead: (conversationId: string, userId: string) => Promise<void>;
  send: (conversationId: string, senderId: string, content: string) => Promise<Message | null>;
  getOrCreate: (coachId: string, clientId: string) => Promise<Conversation | null>;
  refresh: (userId: string) => Promise<void>;
}

export const useMessageStore = create<MessageState>((set, get) => ({
  unreadCount: 0,
  conversations: [],
  isLoading: false,
  lastFetched: null,

  loadUnreadCount: async (userId: string) => {
    try {
      const count = await fetchUnreadMessageCount(userId);
      set({ unreadCount: count });
    } catch (error) {
      console.error('Error loading unread count:', error);
    }
  },

  loadConversations: async (userId: string) => {
    set({ isLoading: true });
    try {
      const conversations = await fetchConversations(userId);
      const totalUnread = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
      set({
        conversations,
        unreadCount: totalUnread,
        isLoading: false,
        lastFetched: Date.now(),
      });
    } catch (error) {
      console.error('Error loading conversations:', error);
      set({ isLoading: false });
    }
  },

  markAsRead: async (conversationId: string, userId: string) => {
    const success = await markMessagesAsRead(conversationId, userId);
    if (success) {
      set(state => ({
        conversations: state.conversations.map(c =>
          c.id === conversationId ? { ...c, unreadCount: 0 } : c
        ),
        unreadCount: state.conversations.reduce(
          (acc, c) => acc + (c.id === conversationId ? 0 : (c.unreadCount || 0)),
          0
        ),
      }));
    }
  },

  send: async (conversationId: string, senderId: string, content: string) => {
    return sendMessage(conversationId, senderId, content);
  },

  getOrCreate: async (coachId: string, clientId: string) => {
    return getOrCreateConversation(coachId, clientId);
  },

  refresh: async (userId: string) => {
    await get().loadConversations(userId);
  },
}));

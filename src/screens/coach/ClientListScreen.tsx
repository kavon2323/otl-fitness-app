import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
} from 'react-native';
import { useCoachStore } from '../../store/coachStore';
import { useAuthStore } from '../../store/authStore';
import { CoachClient } from '../../types';
import { colors } from '../../theme';

interface ClientListScreenProps {
  onBack: () => void;
  onSelectClient?: (client: CoachClient) => void;
}

export const ClientListScreen: React.FC<ClientListScreenProps> = ({
  onBack,
  onSelectClient,
}) => {
  const { user } = useAuthStore();
  const { clients, isLoadingClients, refreshClients, updateClient } = useCoachStore();

  const [selectedClient, setSelectedClient] = useState<CoachClient | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (user?.id) {
      refreshClients(user.id);
    }
  }, [user?.id]);

  const handleUpdateStatus = async (status: CoachClient['status']) => {
    if (selectedClient) {
      await updateClient(selectedClient.id, status, notes || undefined);
      setShowStatusModal(false);
      setSelectedClient(null);
      setNotes('');
    }
  };

  const getStatusColor = (status: CoachClient['status']) => {
    switch (status) {
      case 'active':
        return colors.primary;
      case 'pending':
        return '#FF9800';
      case 'paused':
        return '#9E9E9E';
      case 'terminated':
        return '#F44336';
      default:
        return '#666';
    }
  };

  if (isLoadingClients) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading clients...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Clients</Text>
        <Text style={styles.subtitle}>{clients.length} total clients</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {clients.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyTitle}>No Clients Yet</Text>
            <Text style={styles.emptyText}>
              Clients will appear here when they subscribe to the coaching plan
            </Text>
          </View>
        ) : (
          clients.map((clientRelation) => (
            <TouchableOpacity
              key={clientRelation.id}
              style={styles.clientCard}
              onPress={() => onSelectClient?.(clientRelation)}
              onLongPress={() => {
                setSelectedClient(clientRelation);
                setShowStatusModal(true);
              }}
            >
              <View style={styles.clientAvatar}>
                <Text style={styles.clientInitial}>
                  {(
                    clientRelation.client?.displayName ||
                    clientRelation.client?.email ||
                    'U'
                  )
                    .charAt(0)
                    .toUpperCase()}
                </Text>
              </View>
              <View style={styles.clientInfo}>
                <Text style={styles.clientName}>
                  {clientRelation.client?.displayName || 'Unknown Client'}
                </Text>
                <Text style={styles.clientEmail}>
                  {clientRelation.client?.email || 'No email'}
                </Text>
                <Text style={styles.clientDate}>
                  Since {new Date(clientRelation.startedAt).toLocaleDateString()}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(clientRelation.status) },
                ]}
              >
                <Text style={styles.statusText}>
                  {clientRelation.status.toUpperCase()}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        )}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Status Update Modal */}
      <Modal
        visible={showStatusModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowStatusModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Client Status</Text>
            <Text style={styles.modalSubtitle}>
              {selectedClient?.client?.displayName || selectedClient?.client?.email}
            </Text>

            <TextInput
              style={styles.notesInput}
              placeholder="Add notes (optional)"
              placeholderTextColor="#666"
              value={notes}
              onChangeText={setNotes}
              multiline
            />

            <View style={styles.statusOptions}>
              <TouchableOpacity
                style={[styles.statusOption, { borderColor: colors.primary }]}
                onPress={() => handleUpdateStatus('active')}
              >
                <Text style={[styles.statusOptionText, { color: colors.primary }]}>
                  Active
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.statusOption, { borderColor: '#9E9E9E' }]}
                onPress={() => handleUpdateStatus('paused')}
              >
                <Text style={[styles.statusOptionText, { color: '#9E9E9E' }]}>
                  Paused
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.statusOption, { borderColor: '#F44336' }]}
                onPress={() => handleUpdateStatus('terminated')}
              >
                <Text style={[styles.statusOptionText, { color: '#F44336' }]}>
                  Terminate
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setShowStatusModal(false);
                setSelectedClient(null);
                setNotes('');
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#888',
    marginTop: 12,
    fontSize: 14,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: colors.primary,
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 40,
  },
  clientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  clientAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clientInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  clientInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
  },
  clientEmail: {
    fontSize: 13,
    color: '#888',
    marginBottom: 2,
  },
  clientDate: {
    fontSize: 12,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  bottomPadding: {
    height: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 340,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  notesInput: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    color: '#fff',
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  statusOptions: {
    gap: 12,
    marginBottom: 16,
  },
  statusOption: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    padding: 14,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#888',
    fontSize: 14,
  },
});

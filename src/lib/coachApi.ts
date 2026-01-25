import { supabase } from './supabase';
import {
  UserProfile,
  UserRole,
  SubscriptionTier,
  CoachClient,
  CustomProgram,
  ProgramAssignment,
  Program,
} from '../types';

// Extended UserProfile with role and subscription info
export interface ExtendedUserProfile extends UserProfile {
  role: UserRole;
  subscriptionTier: SubscriptionTier;
}

// ============================================
// User Profile API
// ============================================

export const fetchUserProfile = async (
  userId: string
): Promise<ExtendedUserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }

  return data as ExtendedUserProfile;
};

export const createUserProfile = async (
  userId: string,
  email: string,
  displayName?: string
): Promise<ExtendedUserProfile | null> => {
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      id: userId,
      email,
      display_name: displayName,
      role: 'user',
      subscription_tier: 'free',
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating user profile:', error);
    return null;
  }

  return data as ExtendedUserProfile;
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<ExtendedUserProfile>
): Promise<boolean> => {
  const { error } = await supabase
    .from('user_profiles')
    .update({
      display_name: updates.displayName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId);

  if (error) {
    console.error('Error updating user profile:', error);
    return false;
  }

  return true;
};

// ============================================
// Coach Clients API
// ============================================

export const fetchCoachClients = async (
  coachId: string
): Promise<CoachClient[]> => {
  // Fetch all users with coaching subscription tier
  // In a real app, this would be filtered by coach_id relationship
  const { data, error } = await supabase
    .from('coach_clients')
    .select(
      `
      *,
      client:user_profiles!client_id (
        id,
        email,
        display_name,
        subscription_tier,
        created_at,
        updated_at
      )
    `
    )
    .eq('coach_id', coachId)
    .neq('status', 'terminated');

  if (error) {
    console.error('Error fetching coach clients:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    coachId: row.coach_id,
    clientId: row.client_id,
    status: row.status,
    startedAt: row.started_at,
    notes: row.notes,
    client: row.client
      ? {
          id: row.client.id,
          email: row.client.email,
          displayName: row.client.display_name,
          createdAt: row.client.created_at,
          updatedAt: row.client.updated_at,
        }
      : undefined,
  }));
};

export const fetchCoachingClients = async (): Promise<ExtendedUserProfile[]> => {
  // Fetch all users with coaching subscription tier (available for coaching)
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('subscription_tier', 'coaching');

  if (error) {
    console.error('Error fetching coaching clients:', error);
    return [];
  }

  return (data || []) as ExtendedUserProfile[];
};

export const addClientToCoach = async (
  coachId: string,
  clientId: string
): Promise<CoachClient | null> => {
  const { data, error } = await supabase
    .from('coach_clients')
    .insert({
      coach_id: coachId,
      client_id: clientId,
      status: 'active',
      started_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding client:', error);
    return null;
  }

  return {
    id: data.id,
    coachId: data.coach_id,
    clientId: data.client_id,
    status: data.status,
    startedAt: data.started_at,
    notes: data.notes,
  };
};

export const updateClientStatus = async (
  relationshipId: string,
  status: CoachClient['status'],
  notes?: string
): Promise<boolean> => {
  const { error } = await supabase
    .from('coach_clients')
    .update({ status, notes })
    .eq('id', relationshipId);

  if (error) {
    console.error('Error updating client status:', error);
    return false;
  }

  return true;
};

// ============================================
// Custom Programs API
// ============================================

export const fetchCoachPrograms = async (
  coachId: string
): Promise<CustomProgram[]> => {
  const { data, error } = await supabase
    .from('custom_programs')
    .select('*')
    .eq('coach_id', coachId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching coach programs:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    coachId: row.coach_id,
    name: row.name,
    description: row.description,
    daysPerWeek: row.days_per_week,
    programData: row.program_data as Program,
    isTemplate: row.is_template,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
};

export const createCustomProgram = async (
  coachId: string,
  name: string,
  description: string | undefined,
  daysPerWeek: number,
  programData: Program,
  isTemplate: boolean = false
): Promise<CustomProgram | null> => {
  const { data, error } = await supabase
    .from('custom_programs')
    .insert({
      coach_id: coachId,
      name,
      description,
      days_per_week: daysPerWeek,
      program_data: programData,
      is_template: isTemplate,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating custom program:', error);
    return null;
  }

  return {
    id: data.id,
    coachId: data.coach_id,
    name: data.name,
    description: data.description,
    daysPerWeek: data.days_per_week,
    programData: data.program_data as Program,
    isTemplate: data.is_template,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
};

export const updateCustomProgram = async (
  programId: string,
  updates: {
    name?: string;
    description?: string;
    daysPerWeek?: number;
    programData?: Program;
    isTemplate?: boolean;
  }
): Promise<boolean> => {
  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.daysPerWeek !== undefined) updateData.days_per_week = updates.daysPerWeek;
  if (updates.programData !== undefined) updateData.program_data = updates.programData;
  if (updates.isTemplate !== undefined) updateData.is_template = updates.isTemplate;

  const { error } = await supabase
    .from('custom_programs')
    .update(updateData)
    .eq('id', programId);

  if (error) {
    console.error('Error updating custom program:', error);
    return false;
  }

  return true;
};

export const deleteCustomProgram = async (programId: string): Promise<boolean> => {
  const { error } = await supabase
    .from('custom_programs')
    .delete()
    .eq('id', programId);

  if (error) {
    console.error('Error deleting custom program:', error);
    return false;
  }

  return true;
};

// ============================================
// Program Assignments API
// ============================================

export const fetchProgramAssignments = async (
  coachId: string
): Promise<ProgramAssignment[]> => {
  const { data, error } = await supabase
    .from('program_assignments')
    .select(
      `
      *,
      program:custom_programs (*),
      client:user_profiles!client_id (
        id,
        email,
        display_name,
        created_at,
        updated_at
      )
    `
    )
    .eq('coach_id', coachId)
    .order('assigned_at', { ascending: false });

  if (error) {
    console.error('Error fetching program assignments:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    programId: row.program_id,
    clientId: row.client_id,
    coachId: row.coach_id,
    assignedAt: row.assigned_at,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    notes: row.notes,
    program: row.program
      ? {
          id: row.program.id,
          coachId: row.program.coach_id,
          name: row.program.name,
          description: row.program.description,
          daysPerWeek: row.program.days_per_week,
          programData: row.program.program_data as Program,
          isTemplate: row.program.is_template,
          createdAt: row.program.created_at,
          updatedAt: row.program.updated_at,
        }
      : undefined,
    client: row.client
      ? {
          id: row.client.id,
          email: row.client.email,
          displayName: row.client.display_name,
          createdAt: row.client.created_at,
          updatedAt: row.client.updated_at,
        }
      : undefined,
  }));
};

export const fetchClientAssignments = async (
  clientId: string
): Promise<ProgramAssignment[]> => {
  const { data, error } = await supabase
    .from('program_assignments')
    .select(
      `
      *,
      program:custom_programs (*)
    `
    )
    .eq('client_id', clientId)
    .in('status', ['assigned', 'active'])
    .order('assigned_at', { ascending: false });

  if (error) {
    console.error('Error fetching client assignments:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    programId: row.program_id,
    clientId: row.client_id,
    coachId: row.coach_id,
    assignedAt: row.assigned_at,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    notes: row.notes,
    program: row.program
      ? {
          id: row.program.id,
          coachId: row.program.coach_id,
          name: row.program.name,
          description: row.program.description,
          daysPerWeek: row.program.days_per_week,
          programData: row.program.program_data as Program,
          isTemplate: row.program.is_template,
          createdAt: row.program.created_at,
          updatedAt: row.program.updated_at,
        }
      : undefined,
  }));
};

export const assignProgramToClients = async (
  coachId: string,
  programId: string,
  clientIds: string[],
  startDate?: string,
  notes?: string
): Promise<ProgramAssignment[]> => {
  const assignments = clientIds.map((clientId) => ({
    coach_id: coachId,
    program_id: programId,
    client_id: clientId,
    status: 'assigned',
    start_date: startDate,
    notes,
    assigned_at: new Date().toISOString(),
  }));

  const { data, error } = await supabase
    .from('program_assignments')
    .insert(assignments)
    .select();

  if (error) {
    console.error('Error assigning program:', error);
    return [];
  }

  return (data || []).map((row) => ({
    id: row.id,
    programId: row.program_id,
    clientId: row.client_id,
    coachId: row.coach_id,
    assignedAt: row.assigned_at,
    startDate: row.start_date,
    endDate: row.end_date,
    status: row.status,
    notes: row.notes,
  }));
};

export const updateAssignmentStatus = async (
  assignmentId: string,
  status: ProgramAssignment['status'],
  notes?: string
): Promise<boolean> => {
  const { error } = await supabase
    .from('program_assignments')
    .update({ status, notes })
    .eq('id', assignmentId);

  if (error) {
    console.error('Error updating assignment status:', error);
    return false;
  }

  return true;
};

export const cancelAssignment = async (assignmentId: string): Promise<boolean> => {
  return updateAssignmentStatus(assignmentId, 'cancelled');
};

import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { dummyEndorsements } from '../config/dummy';

const isDummy = true;

interface Endorsement {
  id: string;
  brand: string;
  amount: number;
  status: string;
  date: string;
  user_id: string;
  language: string;
}

interface EndorsementState {
  endorsements: Endorsement[];
  loading: boolean;
  fetchEndorsements: () => Promise<void>;
  addEndorsement: (endorsement: Omit<Endorsement, 'id'>) => Promise<void>;
  updateEndorsement: (id: string, endorsement: Partial<Endorsement>) => Promise<void>;
  deleteEndorsement: (id: string) => Promise<void>;
}

export const useEndorsementStore = create<EndorsementState>((set) => ({
  endorsements: [],
  loading: false,
  fetchEndorsements: async () => {
    if (isDummy) {
      set({ endorsements: dummyEndorsements });
    } else {
      set({ loading: true });
      const { data, error } = await supabase
        .from('endorsements')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) throw error;
      set({ endorsements: data, loading: false });
    }
  },
  addEndorsement: async (endorsement) => {
    if (isDummy) {
      const newEndorsement = { ...endorsement, id: (dummyEndorsements.length + 1).toString() };
      dummyEndorsements.push(newEndorsement);
      set((state) => ({
        endorsements: [...state.endorsements, newEndorsement]
      }));
    } else {
      const { data, error } = await supabase
        .from('endorsements')
        .insert([endorsement])
        .select();
      
      if (error) throw error;
      set((state) => ({
        endorsements: [...state.endorsements, data[0]]
      }));
    }
  },
  updateEndorsement: async (id, endorsement) => {
    if (isDummy) {
      const index = dummyEndorsements.findIndex((e) => e.id === id);
      if (index !== -1) {
        dummyEndorsements[index] = { ...dummyEndorsements[index], ...endorsement };
        set((state) => ({
          endorsements: state.endorsements.map((e) =>
            e.id === id ? { ...e, ...endorsement } : e
          )
        }));
      }
    } else {
      const { data, error } = await supabase
        .from('endorsements')
        .update(endorsement)
        .eq('id', id)
        .select();
      
      if (error) throw error;
      set((state) => ({
        endorsements: state.endorsements.map((e) =>
          e.id === id ? { ...e, ...data[0] } : e
        )
      }));
    }
  },
  deleteEndorsement: async (id) => {
    if (isDummy) {
      const index = dummyEndorsements.findIndex((e) => e.id === id);
      if (index !== -1) {
        dummyEndorsements.splice(index, 1);
        set((state) => ({
          endorsements: state.endorsements.filter((e) => e.id !== id)
        }));
      }
    } else {
      const { error } = await supabase
        .from('endorsements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      set((state) => ({
        endorsements: state.endorsements.filter((e) => e.id !== id)
      }));
    }
  },
}));
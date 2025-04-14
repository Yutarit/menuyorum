// src/lib/supabaseClient.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { setupURLPolyfill } from 'react-native-url-polyfill';

// Supabase'in React Native'de URL'leri doğru işlemesi için gerekli
setupURLPolyfill();

// Supabase kontrol panelinden aldığınız bilgileri buraya girin
const supabaseUrl = 'https://movwdbfixehlinlntqbs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vdndkYmZpeGVobGlubG50cWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1NzU4MDYsImV4cCI6MjA2MDE1MTgwNn0.tMwnWaHfNuYAKYCTWytjujlnbRbVQrifv7W-Jdhoez0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      detectSessionInUrl: false,
      persistSession: true,
    },
    // ----> BU BÖLÜMÜ EKLEYİN <----
    // React Native'in global fetch ve WebSocket'ini kullanmasını sağla
    global: {
      fetch: fetch,
    },
});
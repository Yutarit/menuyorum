// App.tsx
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import AuthScreen from './screens/AuthScreen'; // Yeni ekranı import et
import { supabase } from './src/lib/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { View, Text } from 'react-native'; // Yüklenme ekranı için eklendi

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element | null {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bu kısım aynı kalıyor - oturumu kontrol et
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        console.log('App.tsx: getSession result:', session);
      })
      .catch((error) => {
        console.error('App.tsx: Error getting session:', error);
      })
      .finally(() => {
        setLoading(false);
        console.log('App.tsx: Session check finished.');
      });

    // Oturum değişikliklerini dinle
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log('App.tsx: onAuthStateChange triggered:', session);
      setSession(session);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  // Yüklenirken basit bir mesaj göster
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  // Ana Navigasyon Yapısı
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {session && session.user ? (
          // Eğer kullanıcı giriş yapmışsa (session varsa) HomeScreen'i göster
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          // Eğer kullanıcı giriş yapmamışsa (session null ise) AuthScreen'i göster
          // headerShown: false ile AuthScreen'in başlık çubuğunu gizleyebiliriz
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        )}
        {/* İleride buraya başka ekranlar eklenebilir (örn: Profil, Ayarlar) */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
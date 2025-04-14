// screens/AuthScreen.tsx
import React, { useState } from 'react';
import { Alert, StyleSheet, View, TextInput, Button, Text, ActivityIndicator } from 'react-native';
// Supabase istemcisini import ediyoruz
import { supabase } from '../src/lib/supabaseClient';

function AuthScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Giriş Yap Fonksiyonu
  async function signInWithEmail() {
    setLoading(true); // Yükleniyor durumunu başlat
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      // Hata varsa kullanıcıyı bilgilendir
      Alert.alert('Giriş Hatası', error.message);
    } else {
      // Başarılı giriş durumunda App.tsx'deki listener zaten
      // session değişikliğini algılayıp HomeScreen'e yönlendirecektir.
      // İsterseniz buraya ek bir mesaj ekleyebilirsiniz ama genellikle gerekmez.
      console.log('Giriş başarılı!');
    }
    setLoading(false); // Yükleniyor durumunu bitir
  }

  // Kayıt Ol Fonksiyonu
  async function signUpWithEmail() {
    setLoading(true); // Yükleniyor durumunu başlat
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      // Hata varsa kullanıcıyı bilgilendir
      Alert.alert('Kayıt Hatası', error.message);
    } else if (data.session === null && data.user) {
        // Eğer "Confirm email" açıksa, session null döner ama user bilgisi gelir.
        Alert.alert('Kayıt Başarılı!', 'Lütfen e-posta adresinize gönderilen onay linkine tıklayın.');
    }
    // Eğer Confirm email kapalıysa veya başka bir durum varsa,
    // App.tsx'deki listener session'ı alıp yönlendirme yapacaktır.

    setLoading(false); // Yükleniyor durumunu bitir
  }

  return (
    <View style={styles.container}>
      {/* Yükleniyorsa ActivityIndicator göster */}
      {loading && <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />}

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@adresiniz.com"
          autoCapitalize={'none'}
          keyboardType="email-address"
          editable={!loading} // Yüklenirken düzenlemeyi kapat
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Şifre"
          autoCapitalize={'none'}
          editable={!loading} // Yüklenirken düzenlemeyi kapat
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Giriş Yap" disabled={loading} onPress={signInWithEmail} />
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Kayıt Ol" disabled={loading} onPress={signUpWithEmail} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ekranı kaplaması için
    justifyContent: 'center', // İçeriği ortala (dikey)
    padding: 20, // Kenarlardan boşluk
    backgroundColor: '#f5f5f5', // Arkaplan rengi (isteğe bağlı)
  },
  verticallySpaced: {
    paddingTop: 8, // Dikey boşluk artırıldı
    paddingBottom: 8, // Dikey boşluk artırıldı
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    height: 45, // Yükseklik artırıldı
    backgroundColor: 'white', // Giriş alanı arkaplanı
    borderColor: '#cccccc', // Kenarlık rengi
    borderWidth: 1,
    paddingHorizontal: 15, // Yatay iç boşluk
    borderRadius: 8, // Daha belirgin yuvarlak kenarlar
    fontSize: 16, // Yazı boyutu
  },
  loading: {
    position: 'absolute', // Diğer elemanların üzerine gelsin
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(200, 200, 200, 0.5)' // Hafif transparan arkaplan
  }
});

export default AuthScreen;
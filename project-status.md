# Menuyorum Projesi - Durum Özeti
# Menuyorum Projesi - Durum Özeti

**Tarih:** 17 Nisan 2025, Perşembe

## 1. Proje Bilgileri

* **Adı:** Menuyorum
* **Amacı:** React Native ile Android uygulama geliştirmeyi ve backend olarak Supabase kullanmayı öğrenmek.
* **Senaryo:** Kayıtlı kullanıcılar, belirli restoranların menülerini yorumlar ve diğer kullanıcılar bu yorumları görür.
* **Platform:** React Native (Android odaklı).
* **Backend:** Supabase (Kimlik Doğrulama ve Veritabanı için).

## 2. Mevcut Durum

* **Çekirdek İşlevsellik:** Temel Kimlik Doğrulama (Authentication) akışı (Giriş, Kayıt, Oturum Yönetimi, Koşullu Navigasyon) **tamamlanmış ve çalışır durumda**.
* Uygulama, kullanıcının giriş durumuna göre `AuthScreen` veya `HomeScreen` arasında doğru şekilde yönlendirme yapabiliyor.

## 3. Anahtar Dosyalar ve Durumları

* **`src/lib/supabaseClient.ts`**:
    * Supabase istemcisini başarıyla başlatıyor.
    * React Native için gerekli ayarlar (`AsyncStorage`, `URLPolyfill`, `Workspace`) yapılmış. (*Not: Önceki özette 'Workspace' yazılmıştı, doğrusu `Workspace` olmalı.*)
    * **DİKKAT:** Supabase URL ve Anon Key **doğrudan kod içinde yazılı**. -> ***İleride Düzeltilecek!***
* **`screens/AuthScreen.tsx`**:
    * Çalışan bir kimlik doğrulama ekranı (Giriş/Kayıt).
    * Supabase Auth metotlarını (`signInWithPassword`, `signUp`) kullanıyor.
    * Yüklenme durumu ve hata mesajları yönetiliyor.
* **`screens/HomeScreen.tsx`**:
    * Giriş yapmış kullanıcılar için basit bir yer tutucu ekran.
    * Henüz Supabase'den veri çekme işlevselliği yok.
* **`App.tsx`**:
    * Uygulamanın ana giriş noktası ve navigasyon yöneticisi (React Navigation Stack).
    * Supabase oturumunu (`getSession`, `onAuthStateChange`) yönetiyor.
    * Giriş durumuna göre `AuthScreen` ve `HomeScreen` arasında koşullu yönlendirme yapıyor.

## 4. Proje Yapısı (Ana Hatlar)

.
├── android/         # Android platform kodu & build dosyaları
├── ios/             # iOS platform kodu & build dosyaları
├── node_modules/    # Proje bağımlılıkları
├── screens/         # Ekran bileşenleri
│   ├── AuthScreen.tsx
│   └── HomeScreen.tsx
├── src/
│   └── lib/         # Yardımcı kodlar (Supabase istemcisi vb.)
│       └── supabaseClient.ts
├── __tests__/       # Test dosyaları
├── .bundle/         # (Varsa) Metro bundle çıktıları
├── .gitignore       # Git ignore dosyası
├── App.tsx          # Ana uygulama bileşeni (giriş noktası, navigasyon)
├── babel.config.js  # Babel konfigürasyonu
├── index.js         # React Native giriş noktası
├── metro.config.js  # Metro bundler konfigürasyonu
├── package.json     # Proje meta verileri ve bağımlılıkları
└── tsconfig.json    # (Varsa) TypeScript konfigürasyonu


## 5. Ertelenen/Yapılacak İşler

* **[ÖNCELİKLİ - GÜVENLİK]** Supabase anahtarlarını `supabaseClient.ts` dosyasından bir `.env` dosyasına taşı ve `react-native-dotenv` gibi bir kütüphane ile yükle. (**Kullanıcı isteğiyle ertelendi, ileride hatırlatılacak!**)
* `HomeScreen`'e Supabase'den veri çekme (restoranlar, menüler vb.) işlevselliği eklemek.
* Ana senaryoya uygun diğer ekranları ve bileşenleri oluşturmak (Restoran Detay, Yorum Ekleme vb.).
* UI/UX geliştirmeleri yapmak.
* `README.md` dosyasını detaylandırmak.
* Git işlemlerini tamamlamak (Commit, GitHub'a Push).

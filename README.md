# 🔐 Fullstack JWT Authentication

Aplikacja fullstack do uwierzytelniania użytkowników z wykorzystaniem JSON Web Tokens (JWT). Projekt składa się z backendu w Node.js/Express oraz frontendu w React.

## ⭐ Give A Star

Jeśli projekt Ci się podoba, możesz dać mu gwiazdkę ⭐, aby pokazać innym i pomóc w rozwoju repozytorium.

## 🛠️ Technologie

### Backend
- **Node.js** - środowisko uruchomieniowe JavaScript
- **Express.js** - framework webowy dla Node.js
- **JSON Web Token (JWT)** - uwierzytelnianie i autoryzacja
- **bcrypt** - hashowanie haseł
- **express-validator** - walidacja danych wejściowych
- **CORS** - obsługa Cross-Origin Resource Sharing
- **dotenv** - zarządzanie zmiennymi środowiskowymi
- **nodemon** - automatyczne przeładowanie serwera podczas rozwoju

### Frontend
- **React 19** - biblioteka do budowy interfejsów użytkownika
- **React Router DOM** - routing w aplikacji React
- **Axios** - klient HTTP do komunikacji z API
- **Bootstrap 5** - framework CSS do stylizacji
- **jwt-decode** - dekodowanie tokenów JWT po stronie klienta
- **React Scripts** - narzędzia do budowania aplikacji React

## 📋 Wymagania

- Node.js (wersja 14 lub nowsza)
- npm lub yarn

## 🚀 Getting Started

Te instrukcje pomogą Ci skonfigurować projekt na lokalnej maszynie do celów deweloperskich i testowych.

### Instalacja

1. **Sklonuj repozytorium na lokalną maszynę**

```bash
git clone https://github.com/gmaxsoft/fullstack_jwt_login.git
```

2. **Przejdź do katalogu projektu**

```bash
cd fullstack_jwt_login
```

3. **Skonfiguruj backend**

```bash
cd server
npm install
```

4. **Skonfiguruj frontend**

```bash
cd ../client
npm install
```

5. **Skonfiguruj zmienne środowiskowe**

Utwórz plik `.env` w katalogu `server` na podstawie `.env.example`:

```bash
cd ../server
cp .env.example .env
```

Następnie uzupełnij wymagane zmienne środowiskowe (np. `PORT`, `JWT_SECRET`).

### Uruchomienie

1. **Uruchom serwer backendowy**

```bash
cd server
npm start
```

Serwer będzie dostępny na porcie określonym w pliku `.env` (domyślnie 5000).

2. **Uruchom aplikację frontendową** (w nowym terminalu)

```bash
cd client
npm start
```

Aplikacja React będzie dostępna pod adresem `http://localhost:3000`.

## 📁 Struktura projektu

```
fullstack_jwt_login/
├── client/                 # Aplikacja React (frontend)
│   ├── src/
│   │   ├── components/    # Komponenty React
│   │   ├── services/      # Serwisy API i autoryzacji
│   │   └── ...
│   └── package.json
├── server/                 # Aplikacja Express (backend)
│   ├── routes/            # Definicje tras API
│   ├── middleware/        # Middleware (autoryzacja)
│   ├── database.js        # Baza danych (in-memory)
│   └── package.json
└── README.md
```

## 🔑 Funkcjonalności

- ✅ Rejestracja użytkownika
- ✅ Logowanie użytkownika
- ✅ Ochrona tras wymagających autoryzacji
- ✅ Zarządzanie tokenami JWT
- ✅ Walidacja danych wejściowych
- ✅ Bezpieczne hashowanie haseł

## 🧪 Testy

Projekt zawiera kompleksowe testy jednostkowe dla aplikacji frontendowej.

### Uruchomienie testów

Aby uruchomić testy dla aplikacji klienckiej:

```bash
cd client
npm test
```

### Pokrycie testami

Aby uruchomić testy z raportem pokrycia:

```bash
cd client
npm test -- --coverage --watchAll=false
```

### Struktura testów

Testy znajdują się w następujących lokalizacjach:

- **Komponenty**: `client/src/components/__tests__/`
  - `Login.test.js` - testy komponentu logowania
  - `Signup.test.js` - testy komponentu rejestracji
  - `Home.test.js` - testy komponentu strony głównej
  - `Private.test.js` - testy komponentu strony prywatnej
  - `App.test.js` - testy głównego komponentu aplikacji

- **Serwisy**: `client/src/services/__tests__/`
  - `auth.service.test.js` - testy serwisu autoryzacji
  - `token.service.test.js` - testy serwisu zarządzania tokenami
  - `post.service.test.js` - testy serwisu postów

### Technologie testowe

- **Jest** - framework testowy
- **React Testing Library** - narzędzia do testowania komponentów React
- **@testing-library/jest-dom** - dodatkowe matchery dla DOM

### CI/CD

Projekt wykorzystuje GitHub Actions do automatycznego uruchamiania testów przy każdym pushu i pull requeście. Workflow znajduje się w `.github/workflows/ci.yml`.

## 📝 Licencja

GNU

## 👤 Autor

Maxsoft

// Each platform drives: an orbit card in the hero, its terminal command on the
// phone screen, and its entry in the platform showcase strip.
export const platforms = [
  {
    id: 'android',
    label: 'Android',
    command: 'npx create-expo-app --template android',
    color: '#4be8ff',
    note: 'Kotlin + Jetpack Compose',
  },
  {
    id: 'ios',
    label: 'iOS',
    command: 'swift package init --type executable',
    color: '#8bb1ff',
    note: 'Swift + SwiftUI',
  },
  {
    id: 'flutter',
    label: 'Flutter',
    command: 'flutter create club_app && flutter run',
    color: '#4f7dff',
    note: 'One codebase, every screen',
  },
  {
    id: 'react-native',
    label: 'React Native',
    command: 'npx react-native init ClubApp',
    color: '#c79bff',
    note: 'JS in, native out',
  },
  {
    id: 'kotlin',
    label: 'Kotlin Multiplatform',
    command: './gradlew iosSimulatorArm64Test',
    color: '#9b5cff',
    note: 'Share logic, not UI',
  },
  {
    id: 'swift',
    label: 'SwiftUI',
    command: 'xcrun simctl boot "iPhone 15"',
    color: '#eef0ff',
    note: 'Declarative, native-fast',
  },
]

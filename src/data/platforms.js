export const platforms = [
  { label: 'Android', cmd: './gradlew run', abbr: 'A', color: '#00ff66', glow: '0,255,102' },
  { label: 'iOS', cmd: 'xcodebuild run', abbr: 'i', color: '#a3e635', glow: '163,230,53' },
  { label: 'Flutter', cmd: 'flutter run', abbr: 'Fl', color: '#39ff14', glow: '57,255,20' },
  {
    label: 'React Native',
    cmd: 'npx react-native run',
    abbr: 'RN',
    color: '#00e676',
    glow: '0,230,118',
  },
  { label: 'Kotlin', cmd: 'kotlinc main.kt', abbr: 'K', color: '#00ff66', glow: '0,255,102' },
  { label: 'Swift', cmd: 'swift build', abbr: 'Sw', color: '#a3e635', glow: '163,230,53' },
]

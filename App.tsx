import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-secondary">
      <Text className="text-4xl font-bold text-neutral-darkest">JUNO</Text>
      <Text className="text-lg text-neutral-dark mt-2">
        honestly, never better
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

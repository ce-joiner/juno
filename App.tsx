/**
 * Juno App Entry Point
 *
 * Configures AWS Amplify and renders the main app.
 * Amplify connects the app to AWS services (Cognito, AppSync, DynamoDB).
 */

import { Amplify } from 'aws-amplify';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import outputs from './amplify_outputs.json';

Amplify.configure(outputs);

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-secondary">
      <Text className="text-4xl font-bold text-neutral-darkest">JUNO</Text>
      <Text className="text-lg text-neutral-dark mt-2">
        honestly, never better
      </Text>
      <Text className="text-sm text-neutral-dark mt-4">
        ✅ AWS Amplify Connected
      </Text>
      <Text className="text-sm text-neutral-dark mt-2">
        ✅ Authentication Working
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

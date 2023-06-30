import WebView from "react-native-webview";
import { SafeAreaView } from "react-native";

const App = () => {
  return <SafeAreaView style={{ flex: 1 }}>
      <WebView source={{ uri: 'http://localhost:3000' }} />
    </SafeAreaView>;
};

export default App;
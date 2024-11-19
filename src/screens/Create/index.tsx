import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Platform,
  Text,
  SafeAreaView,
} from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "../../services/supabase";

import { NavigationProp } from '@react-navigation/native';

export function CreateAccount({ navigation }: { navigation: NavigationProp<any> }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignUp() {
    const { data: session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert("Erro ao cadastrar", error.message);
      return;
    }

    if (session) {
      Alert.alert("Cadastro realizado com sucesso!");
      navigation.navigate("Auth"); // Redireciona para a tela de login
    }
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Preencha os campos abaixo para se cadastrar</Text>
        <View style={styles.inputGroup}>
          <Input
            label="Email"
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "red",
            }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="email@endereco.com"
            autoCapitalize="none"
            inputContainerStyle={styles.inputContainer}
          />
          <Input
            label="Senha"
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: "red",
            }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Senha"
            autoCapitalize="none"
            inputContainerStyle={styles.inputContainer}
          />
        </View>
        <View style={styles.buttonGroup}>
          <Button
            title="Cadastrar"
            onPress={handleSignUp}
            buttonStyle={styles.button}
          />
          <Button
            title="Voltar"
            onPress={() => navigation.goBack()}
            buttonStyle={[styles.button, styles.backButton]}
            titleStyle={styles.backTitle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputContainer: {
    borderBottomWidth: 0,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginVertical: 10,
  },
  buttonGroup: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    display: "flex",
    backgroundColor: "red",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: 300,
  },
  backButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "red",
  },
  backTitle: {
    color: "red",
  },
});
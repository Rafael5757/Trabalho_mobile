import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { supabase } from "../../services/supabase";

import { RouteProp, useRoute } from "@react-navigation/native";

export function Details() {
  const route = useRoute<RouteProp<{ params: { groupId: number } }, "params">>();
  const { groupId } = route.params;

  const [groupDetails, setGroupDetails] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("grupos")
          .select("nome_grupo, alunos (nome_aluno), avaliacoes (nota)")
          .eq("id_grupo", groupId)
          .single(); // Use single() se você espera apenas um resultado

        if (error) {
          setError(error.message);
        } else {
          setGroupDetails(data);
        }
      } catch (err) {
        setError("Ocorreu um erro inesperado.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="red" />
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!groupDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Grupo não encontrado.</Text>
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.sectionTitle}>Nome do grupo: </Text>
      <Text style={styles.title}>{groupDetails.nome_grupo}</Text>
      <Text style={styles.sectionTitle}>Descrição:</Text>
      <Text style={styles.description}>{groupDetails.descricao || "Sem descrição disponível."}</Text>

      <Text style={styles.sectionTitle}>Alunos</Text>
      {groupDetails.alunos.length > 0 ? (
        groupDetails.alunos.map((aluno: any, index: number) => (
          <Text key={index} style={styles.itemText}>
            {aluno.nome_aluno || "Nome não informado"}
          </Text>
        ))
      ) : (
        <Text style={styles.noDataText}>Nenhum aluno registrado.</Text>
      )}


      <Text style={styles.sectionTitle}>Avaliações</Text>
      {groupDetails.avaliacoes.length > 0 ? (
        groupDetails.avaliacoes.map((avaliacao: any, index: number) => (
          <Text key={index} style={styles.itemText}>
            Nota: {avaliacao.nota || "Sem nota"}
          </Text>
        ))
      ) : (
        <Text style={styles.noDataText}>Nenhuma avaliação disponível.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginTop: 20,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 16,
    color: "#888",
  },
});

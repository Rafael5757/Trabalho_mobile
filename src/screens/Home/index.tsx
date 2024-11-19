import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { supabase } from "../../services/supabase";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [groups, setGroups] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchGroups = async () => {
      const { data, error } = await supabase
        .from("grupos")
        .select(`
          id_grupo,
          nome_grupo,
          alunos(*),
          avaliacoes(*)
        `);
  
      if (error) {
        console.error("Erro ao buscar grupos:", error.message);
        console.error("Detalhes:", error.details);
        console.error("Sugestão:", error.hint);
      } else {
        setGroups(data);
        console.log("Grupos obtidos:", data);
      }
    };
  
    fetchGroups();
  },[]);

  const renderItem = ({ item }: any) => {
    // Acessando as avaliações
    const avaliacoes = item.avaliacoes || [];
    
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Details", { groupId: item.id_grupo })}
      >
        <Text style={styles.cardTitle}>{item.nome_grupo}</Text>
  
        {/* Exibindo as avaliações */}
        {avaliacoes.map((avaliacao: any, index: number) => (
          <Text key={index} style={styles.cardSubtitle}>
            Nota: {avaliacao.nota || "Sem nota"}
          </Text>
        ))}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grupos</Text>
      <FlatList
        data={groups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id_grupo.toString()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "red",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888",
  },
});

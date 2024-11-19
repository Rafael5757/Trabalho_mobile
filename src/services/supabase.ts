import AsyncStorage from "@react-native-async-storage/async-storage"
import { createClient } from "@supabase/supabase-js"
import { AppState } from "react-native"
import "react-native-url-polyfill"

const supabaseUrl = "https://zydoliywzwyfoqgtsbpz.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5ZG9saXl3end5Zm9xZ3RzYnB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MzM3OTYsImV4cCI6MjA0NzUwOTc5Nn0.7q0F_2KPbU0xlxsMFTplQn5c21H3sbaXVmw9nHiuHko"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

AppState.addEventListener("change", (State) => {
    if(State === "active"){
        supabase.auth.startAutoRefresh()
    }else{
        supabase.auth.stopAutoRefresh()
    }
})
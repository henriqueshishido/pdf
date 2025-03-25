import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TCC1_Vinculo from "./pages/Tcc1_vinculo";
import TCC1_Autorizacao from "./pages/Tcc1_autorizacao";
import TCC1_Convalidacao from "./pages/Tcc1_convalidacao";
import TCC1_Declaracao_Supervisor from "./pages/Tcc1_declaracao_supervisor";
import TCC2_Convalidacao from "./pages/Tcc2_convalidacao";
import TCC2_Declaracao_Supervisor from "./pages/Tcc2_declaracao_supervisor";
import TCC2_Autorizacao from "./pages/Tcc2_autorizacao";
import TCC2_Avaliacao from "./pages/Tcc2_avaliacao";
import TCC2_Declaracao_Correcao from "./pages/Tcc2_declaracao_correcao";

function App() {
  return (
    <Router basename=" / ">
      <Routes>
        <Route path="/TCC1_Vinculo" element={<TCC1_Vinculo />} />
        <Route path="/TCC1_Autorizacao" element={<TCC1_Autorizacao />} />
        <Route path="/TCC1_Convalidacao" element={<TCC1_Convalidacao />} />
        <Route path="/TCC1_Declaracao_Supervisor" element={<TCC1_Declaracao_Supervisor />} />
        <Route path="/TCC2_Convalidacao" element={<TCC2_Convalidacao />} />
        <Route path="/TCC2_Declaracao_Supervisor" element={<TCC2_Declaracao_Supervisor />} />
        <Route path="/TCC2_Autorizacao" element={<TCC2_Autorizacao />} />
        <Route path="/TCC2_Avaliacao" element={<TCC2_Avaliacao />} />
        <Route path="/TCC2_Declaracao_Correcao" element={<TCC2_Declaracao_Correcao />} />
      </Routes>
    </Router>
  );
}

export default App

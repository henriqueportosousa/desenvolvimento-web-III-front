export function formatarDataBrasileira(data) {
  if (!data) return "";
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

export function converterSalarioParaNumero(salario) {
  const valorSemSimbolo = salario.replace(/[^\d,]/g, "");
  return Number(valorSemSimbolo.replace(",", "."));
}

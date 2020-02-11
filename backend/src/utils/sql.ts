class convert {
  public constructor() {}

  table(table: Object, values: Array<Object>): string {
    let infodata: string;

    const tables = [
      "id",
      "guia",
      "data_emissao",
      "codigo_beneficiario",
      "nome_titular_contrato",
      "nome_titular",
      "empresa",
      "codigo_contrato",
      "plano",
      "idade_beneficiario",
      "procedimento",
      "descricao",
      "valor_tabela",
      "valor_faturamento_especifico",
      "quantidade",
      "quantidade_solicitada",
      "valor_copart_caixa",
      "valor_copart_prestador",
      "codigo_taxa",
      "descricao_taxa",
      "valor_tabela_taxa",
      "copart_taxa",
      "forma_de_copart",
      "cobrada",
      "especialidade_guia",
      "codigo_prestador_exec",
      "nome_prestador",
      "local_atendimento_executante",
      "cidade_prestador_executante",
      "estado_prestador_executante",
      "especialidade_solicitante",
      "codigo_prestador_soli",
      "nome_solicitante",
      "faturamento_quantidade",
      "status_da_guia",
      "conta",
      "data_criacao_conta",
      "data_atendimento_conta",
      "valor_conta",
      "data_criacao_lote",
      "lote",
      "situacao_lote",
      "competencia_contabil"
    ];

    table.forEach((element, row) => {
      if (row !== 0 || element !== undefined) {
        let str = "INSERT INTO `poa_clinicas` (";

        tables.map((i, j) => {
          if (j === 0) {
            str += `\`${i}\``;
          } else {
            str += `,\`${i}\``;
          }
        });

        str += ") VALUES (NULL,";

        tables.map((i, j) => {
          if (j === 0) return;

          if (element) {
            const nome = Object.keys(element)
              .toString()
              .toLowerCase();

            if (i.toUpperCase() in element) {
              if (j !== 1) {
                str += ",";
              }
              str += `'${element[i.toUpperCase()]}'`;
            } else {
              if (j !== 1) {
                str += ",";
              }
              str += "'0'";
            }

            if (element[i.toUpperCase()]) {
              // console.log(element[i.toUpperCase()]);
            }
          }
        });

        // let row = 0;
        // for (let i in element) {
        //   if (row !== 0) str += " ,";
        //   if (i === "undefined" || undefined) continue;

        //   str += ` '${element[i]}'`;
        //   row++;
        // }

        str += ");\n";

        infodata += str;
      }
    });
    return infodata;
  }
}

export default convert;

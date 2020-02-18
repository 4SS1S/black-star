class convert {
  public constructor() {}

  table(table: Array<Object>, values: Array<Object>): string {
    let infodata: string;

    const tables = [
      "id",
      "guia",
      "data_emissao",
      "codigo_beneficiario",
      "nome_beneficiario",
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

    let init = "INSERT INTO `wm_poa_clinicas` (";

    tables.map((i, j) => {
      if (j === 0) {
        init += `\`${i}\``;
      } else {
        init += `,\`${i}\``;
      }
    });

    init += ") VALUES";
    infodata += init;

    table.forEach((element: Array<Object>, row: number) => {
      if (row !== 0 || element !== undefined) {
        let str: String;
        str += "(NULL,";

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

              const prev_date = "T03:00:28.000Z";
              let text: String = element[i.toUpperCase()].toString();

              if (text.includes(prev_date)) {
                text = text.replace(prev_date, "");
              }

              if (text.includes("/19")) {
                const prev_text = text.split("/");

                text = `20${prev_text[2]}-${prev_text[1]}-${prev_text[0]}`;
              }

              str += `'${text}'`;
            } else {
              if (j !== 1) {
                str += ",";
              }
              str += "NULL";
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

        str += "),\n";

        infodata += str;
      }
    });
    return infodata;
  }
}

export default convert;

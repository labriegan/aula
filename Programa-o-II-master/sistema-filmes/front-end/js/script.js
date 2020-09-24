$(function () {
  changePage('inicial');
  $('#link-listar').click(function () {
    $.ajax({
      url: 'http://localhost:5000/get-filmes',
      method: 'GET',
      dataType: 'json', 
      success: listFilme, 
      error: function () {
        alert('erro ao ler dados, verifique o backend');
      },
    });
  });

  $('#link-inicial').click(function () {
    changePage('inicial');
  });

  $('#nav-brand').click(function () {
    changePage('inicial');
  });

  $('#btn-incluir').click(function () {
    const nome = $('#campo-nome').val();
    const genero = $('#campo-genero').val();
    const distribuidora = $('#campo-distribuidora').val();
    const diretores = $('#campo-diretores').val();
    

    const filmeData = JSON.stringify({
      nome: nome,
      genero: genero,
      distribuidora: distribuidora,
      diretores: diretores,
    
    });

    $.ajax({
      url: 'http://localhost:5000/create-filmes',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: filmeData,
      success: createFilme,
      error: createFilmeError,
    });
  });


  function createFilme(resposta) {
    if (resposta.result == 'ok') {
        alert('Filme adicionado com sucesso')
        $('#campo-nome').val('');
        $('#campo-genero').val('');
        $('#campo-distribuidora').val('');
        $('#campo-diretores').val('');
       
    } else {
        alert('Erro na adição do filme!')
    }
  }

  function createFilmeError(resposta){
    alert('Erro na chamada do back-end')
  }

  function listFilme(filmes) {
    var rows = '';

    for (filme of filmes) {
      newRow = `<tr> 
                      <td>${filme.id}</td> 
                      <td>${filme.nome}</td> 
                      <td>${filme.genero}</td> 
                      <td>${filme.distribuidora}</td> 
                      <td>${filme.diretores}</td> 
                        
                </tr>`;
      rows += newRow;
      $('#tableBody').html(rows);
    }
    changePage('listar');
  }

  function changePage(nextPage) {
    $('#container-inicial').addClass('invisible');
    $('#container-listar').addClass('invisible');
    $(`#container-${nextPage}`).removeClass('invisible');
  }
});
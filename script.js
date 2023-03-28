const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const sCodigo = document.querySelector('#m-codigo')
const sNome = document.querySelector('#m-nome')
const sFabricante = document.querySelector('#m-fabricante')
const sDescricao = document.querySelector('#m-descricao')
const sQuantidade = document.querySelector('#m-quantidade')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    sCodigo.value = itens[index].codigo
    sNome.value = itens[index].nome
    sFabricante.value = itens[index].fabricante
    sDescricao.value = itens[index].descricao
    sQuantidade.value = itens[index].quantidade
    id = index
  } else {
    sCodigo.value = ''
    sNome.value = ''
    sFabricante.value = ''
    sDescricao.value = ''
    sQuantidade.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.codigo}</td>
    <td>${item.nome}</td>
    <td>${item.fabricante}</td>
    <td>${item.descricao}</td>
    <td>${item.quantidade}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (sCodigo.value == '' || sNome.value == '' || sFabricante.value == '' || sDescricao.value == '' || sQuantidade.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].codigo = sCodigo.value
    itens[id].nome = sNome.value
    itens[id].fabricante = sFabricante.value
    itens[id].descricao = sDescricao.value
    itens[id].quantidade = sQuantidade.value
  } else {
    itens.push({'codigo': sCodigo.value,'nome': sNome.value, 'fabricante': sFabricante.value, 'descricao': sDescricao.value, 'quantidade': sQuantidade.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()
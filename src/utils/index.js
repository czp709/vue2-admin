const sort = (nodeArr) => {
  nodeArr.forEach((item) => {
    if (item.children) {
      item.children = sort(item.children)
    }
  })
  nodeArr = nodeArr.sort((a, b) => {
    return a.orderNum - b.orderNum
  })
  return nodeArr
}
const array2Tree = (arr, opthion = { id: 'id', parentId: 'parentId' }) => {
  const idKey = opthion.id || 'id'
  const parentKey = opthion.parentId || 'parentId'
  if (!Array.isArray(arr) || !arr.length) {
    return
  }
  const map = {}
  arr.forEach((item) => {
    return (map[item[idKey]] = item)
  })
  const roots = []
  arr.forEach((item) => {
    const parent = map[item[parentKey]]
    if (parent) {
      if (parent.children) {
        parent.children.push(item)
      } else {
        parent.children = []
        parent.children.push(item)
      }
    } else {
      roots.push(item)
    }
  })
  return sort(roots)
}
export default array2Tree

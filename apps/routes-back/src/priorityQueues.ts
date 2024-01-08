import airport from "./connectDB/interfaces";

export interface Node  {
    airportDetails: airport;
    value: number,
    key: number  
}

export const nodes: airport[] = []

export const startHeap = () => {
    const nodes: airport[] = []
    return nodes
}

export const insert = ( newNode:airport ) => {
    nodes.push(newNode)
    nodes[nodes.length-1].key = nodes.length - 1
    heapify_up( nodes, newNode.key )
}

export const findMin = () => {
    return nodes[0]
}

export const deleteNode = (  position:number ) => {
    nodes[position] = nodes[nodes.length - 1]
    nodes.pop()
    if(nodes.length > 0) nodes[position].key = position
    console.log(nodes.length)
    if(nodes.length > 1){
    const parent = nodes[Math.floor(position/2)].value
    const leftChild = nodes[2 * position].value
    const rightChild = nodes[2 * position + 1].value
    if ( nodes[position].value < parent){
        heapify_up( nodes, position )
    } else if ( nodes[position].value > rightChild || nodes[position].value > leftChild){
        heapify_down ( nodes, position )
    }
    }
}

export const extractMin = () => {
    const min  = findMin()
    deleteNode(  min.key)
}

export const changeKey =( node: airport, newValue: number) => {
    if (node.value > newValue){
        node.value = newValue
        heapify_up( nodes, node.key )
    }else if ( node.value < newValue ){
        node.value = newValue
        heapify_up( nodes, node.key )
    }
}

const heapify_up = ( nodes:airport[], position:number ) => {
    if (position >= 1) {
       const parent = Math.floor(position/2)
        if (nodes[position].value < nodes[parent].value){
           const tem = nodes[parent]
            nodes[parent] = nodes[position]
            nodes[parent].key = parent
            nodes[position] = tem
            nodes[position].key = position
            heapify_up( nodes, parent) 
        }
    }
    
}

const heapify_down = ( nodes:airport[], position:number ) => {
    const length = nodes.length - 1
    let minIndex = position
    if (position * 2 > length) {
        return null
    }
    else if (position * 2 < length) {
        const left = 2 * position
        const right = 2 * position + 1
        const min = Math.min(nodes[left].value, nodes[right].value)
        min == nodes[left].value ?  minIndex = left : minIndex = right
    }
    else if (position * 2 == length) {
        const minIndex = position * 2
    }
    if (nodes[minIndex].value < nodes[position].value) {
        const tem = nodes[minIndex]
        nodes[minIndex] = nodes[position]
        nodes[minIndex].key = minIndex
        nodes[position] = tem
        nodes[position].key = position
        heapify_down(nodes, minIndex)
    }
}


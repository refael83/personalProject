export interface Node  {
    airportDetails: string;
    value: number,
    key: number  
}

export let nodes: Node[] = []

export const startHeap = () => {
    let nodes: Node[] = []
    return nodes
}

export const insert = ( newNode:Node ) => {
    nodes.push(newNode)
    nodes[nodes.length-1].key = nodes.length - 1
    heapify_up( nodes, nodes.length )
}

export const findMin = () => {
    return nodes[0]
}

export const deleteNode = ( nodes:Node[], position:number ) => {
    nodes[position] = nodes[nodes.length - 1]
    let parent = nodes[position/2].value
    let leftChild = nodes[2 * position].value
    let rightChild = nodes[2 * position + 1].value
    if ( nodes[position].value < parent){
        heapify_up( nodes, position )
    } else if ( nodes[position].value > rightChild || nodes[position].value > leftChild){
        heapify_down ( nodes, position )
    }
}

export const extractMin = () => {
    let min  = findMin()
    deleteNode( nodes, min.key)
}

export const changeKey =(nodes: Node[], node: Node, newValue: number) => {
    if (node.value > newValue){
        heapify_up( nodes, node.key )
    }else if ( node.value < newValue ){
        heapify_down( nodes, node.key )
    }
}

const heapify_up = ( nodes:Node[], position:number ) => {
    if (position > 1) {
        let parent = position/2
        if (nodes[position] < nodes[parent]){
            let tem = nodes[parent]
            nodes[parent] = nodes[position]
            nodes[parent].key = parent
            nodes[position] = tem
            nodes[position].key = position
            heapify_up( nodes, parent)
        }
    }
}

const heapify_down = ( nodes:Node[], position:number ) => {
    let length = nodes.length - 1
    let minIndex = position
    if (position * 2 > length) {
        return null
    }
    else if (position * 2 < length) {
        let left = 2 * position
        let right = 2 * position + 1
        let min = Math.min(nodes[left].value, nodes[right].value)
        min == nodes[left].value ?  minIndex = left : minIndex = right
    }
    else if (position * 2 == length) {
        let minIndex = position * 2
    }
    if (nodes[minIndex].value < nodes[position].value) {
        let tem = nodes[minIndex]
        nodes[minIndex] = nodes[position]
        nodes[minIndex].key = minIndex
        nodes[position] = tem
        nodes[position].key = position
        heapify_down(nodes, minIndex)
    }
}


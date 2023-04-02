<script setup lang="ts">
import {reactive, ref, watch} from 'vue'
import {defineConfigs, Edges, Nodes, VNetworkGraph} from "v-network-graph";
import "v-network-graph/lib/style.css";
import {ForceLayout} from "v-network-graph/lib/force-layout";


const node: Nodes = {
    node1: {name: "N1"},
    node2: {name: "N2"},
    node3: {name: "N3"},
    node4: {name: "N4"},
    node5: {name: "N5"},
    node6: {name: "N6"},
    node7: {name: "N7"},
    node8: {name: "N8"},
    node9: {name: "N9"},
    node10: {name: "N10"},
    node11: {name: "N11"},
}

const edge: Edges = {
    edge1: {source: "node1", target: "node2"},
    edge2: {source: "node1", target: "node3"},
    edge3: {source: "node1", target: "node4"},
    edge4: {source: "node1", target: "node5"},
    edge5: {source: "node1", target: "node6"},
    edge6: {source: "node1", target: "node7"},
    edge7: {source: "node1", target: "node8"},
    edge8: {source: "node1", target: "node9"},
    edge9: {source: "node1", target: "node10"},
    edge10: {source: "node1", target: "node11"},
}

const nodes: Nodes = reactive(node);

const edges: Edges = reactive(edge);

const layouts = ref({
    nodes: {
        node1: {
            x: 0,
            y: 0,
            fixed: true,
        },
    },
})

const nextNodeIndex = ref(Object.keys(nodes).length + 1);
const nextEdgeIndex = ref(Object.keys(edges).length + 1);

const selectedNodes = ref<string[]>([]);
const selectedEdges = ref<string[]>([]);

const selectEdge = () => {
    const edge = selectedEdges.value;
    let targetNode = null;
    if(edge.length > 0){
        targetNode = edges[edge].target;
    }else{
        targetNode = selectedNodes[0].value;
    }
    for(const e in edges){
        if(edges[e].target != targetNode){
            //delete node and edge
            delete nodes[edges[e].target]
            delete edges[e]
        }
    }
}

const configs = defineConfigs({
    node:{
        selectable: false,
    },
    edge:{
        selectable: true,
        normal: {
            color: '#000',
            width: 3,
            dasharray: "3",
        },
        selected: {
            color: '#000',
            dasharray: "0",
        },
        marker: {
            source: {

            }, target: {
                type: 'arrow',
                color: '#000',
            }
        }
    },
    view:{
        layoutHandler: new ForceLayout({
            positionFixedByDrag: true,
            positionFixedByClickWithAltKey: true,
        })
    }
})
</script>
<template>
    <div>
        <v-btn @click="selectEdge" :disabled="selectedEdges.length == 0">Select Edge</v-btn>
        <v-network-graph
                class="graph"
                v-model:selected-nodes="selectedNodes"
                v-model:selected-edges="selectedEdges"
                :nodes="nodes"
                :edges="edges"
                :configs="configs"
        />
    </div>
</template>
<style>
.graph {
    width: 640px;
    height: 360px;
    border: 1px solid #000;
}
</style>
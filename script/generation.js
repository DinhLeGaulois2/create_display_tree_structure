const buildTree = size => {
    // RESET the tree before to build a new one...
    localTree = {}

    if (size < _minSize) alert("A tree with less than " + _minSize + " nodes is too small to be interesting! Please, build a bigger one!")
    else if (size > _maxSize) alert("A tree with more than " + _maxSize +
        " nodes is too big for us to see all things. The goal is to understand the structure of trees...")
    else {
        let counter = 0
        let existingIds = {}
        let ids = []

        while (counter < size) {
            let aNodeId = Math.floor(Math.random() * _maxSize * 2) + 1
            if (existingIds[aNodeId.toString()] === undefined) {
                let parentId = ids.length === 0 ? -1 : ids[Math.floor(Math.random() * ids.length)]

                existingIds[aNodeId.toString()] = true
                ids.push(aNodeId)

                let aNode = {
                    name: "",
                    parentId,
                    childrenIds: []
                }

                if (parentId > -1)
                    localTree.nodes[parentId.toString()].childrenIds.push(aNodeId)

                // the node is the tree's ROOT
                if (counter === 0) {
                    localTree["rootId"] = aNodeId

                    aNode["position"] = 1

                    localTree["nodes"] = {
                        [aNodeId.toString()]: aNode
                    }
                }
                else { // NOT a tree's ROOT

                    aNode["position"] = localTree.nodes[parentId.toString()].childrenIds.length
                    localTree.nodes[aNodeId.toString()] = aNode
                }

                counter++
            }
        }

        const setNodeNames = () => {
            if (localTree.rootId > -1) {
                localTree.nodes[localTree.rootId.toString()]["name"] = "root"

                const reccChildren = (parentName, level, list) => {
                    if (list.length === 0) return
                    else {
                        let aNodeId = list.shift()


                        let pos = localTree.nodes[aNodeId.toString()].position
                        let name = parentName.length > 0 ? parentName + "." + pos : pos.toString()
                        localTree.nodes[aNodeId.toString()]["name"] = name
                        reccChildren(name, level + 1, [...localTree.nodes[aNodeId.toString()].childrenIds])
                        reccChildren(parentName, level, list)
                    }
                }

                reccChildren("", 1, [...localTree.nodes[localTree.rootId.toString()].childrenIds])
            }
        }

        setNodeNames()

        return localTree
    }
}
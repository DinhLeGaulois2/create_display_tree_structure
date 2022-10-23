const sortingObjsInArr = (arr, isAsc, fieldName) => {
    const compareByWordAsc = (a, b) => {
        if (a[fieldName] < b[fieldName])
            return -1;
        if (a[fieldName] > b[fieldName])
            return 1;
        return 0;
    }

    const compareByWordDesc = (a, b) => {
        if (a[fieldName] > b[fieldName])
            return -1;
        if (a[fieldName] < b[fieldName])
            return 1;
        return 0;
    }

    if (isAsc) return arr.sort(compareByWordAsc)
    else return arr.sort(compareByWordDesc)
}

const buildTocNoRecc = () => {
    let toc = []

    if (globalTree.rootId > -1) {
        let temp = []

        toc.push({
            name: globalTree.nodes[globalTree.rootId.toString()].name,
            nodeId: globalTree.rootId,
            level: 0,
        })

        const getChildren = (childrenLevel, parentId) => {
            let arr = []
            let ids = globalTree.nodes[parentId.toString()].childrenIds
            for (let i = 0; i < ids.length; i++) {
                let childId = ids[i]
                arr.push({
                    level: childrenLevel,
                    name: globalTree.nodes[childId.toString()].name,
                    nodeId: childId,
                    position: globalTree.nodes[childId.toString()].position,
                })
            }
            return sortingObjsInArr(arr, true, "position")
        }

        temp = getChildren(1, globalTree.rootId)

        while (temp.length > 0) {
            let t = temp.shift()
            toc.push({
                name: t.name,
                nodeId: t.nodeId,
                level: t.level,
            })
            temp = getChildren(t.level + 1, t.nodeId).concat(temp)
        }
        return toc
    }
}

const buildTOCRecc = () => {
    let toc = []

    if (globalTree.rootId > -1) {
        let toc = [{
            name: globalTree.nodes[globalTree.rootId.toString()].name,
            nodeId: globalTree.rootId,
            level: 0,
        }]

        const reccChildren = (parentName, level, list) => {
            if (list.length === 0) return
            else {
                let aNodeId = list.shift()

                let pos = globalTree.nodes[aNodeId.toString()].position
                let name = parentName.length > 0 ? parentName + "." + pos : pos.toString()

                toc.push({
                    name,
                    nodeId: aNodeId,
                    level,
                })
                reccChildren(name, level + 1, [...globalTree.nodes[aNodeId.toString()].childrenIds])
                reccChildren(parentName, level, list)
            }
        }

        reccChildren("", 1, [...globalTree.nodes[globalTree.rootId.toString()].childrenIds])
        return toc
    }
    else return toc
}

const setPath = nodeId => {
    // reset existing path...
    path = []

    const nodes = globalTree.nodes
    let anId = nodeId
    while (anId > 0) {
        path.unshift(anId)
        anId = nodes[anId.toString()].parentId
    }
}

const isOnPath = anId => {
    const nodeId = parseInt(anId, 10)
    if (nodeId === path[path.length - 1]) return PATH_ACTIVE
    else {
        for (let i = 0; i < (path.length - 1); i++)
            if (nodeId === path[i]) return PATH_ON_THE_WAY
        return PATH_NOTHING
    }
}
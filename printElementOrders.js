export default function printElementOrders(tree) {
    console.log();

    let levelOrderString = '';
    tree.levelOrderForEach((node) => (levelOrderString += `${node.data}, `));
    console.log(`Level Order: ${levelOrderString}`);
    console.log();

    let preOrderString = '';
    tree.preOrderForEach((node) => (preOrderString += `${node.data}, `));
    console.log(`Pre Order: ${preOrderString}`);
    console.log();

    let inOrderString = '';
    tree.inOrderForEach((node) => (inOrderString += `${node.data}, `));
    console.log(`In Order: ${inOrderString}`);
    console.log();

    let postOrderString = '';
    tree.postOrderForEach((node) => (postOrderString += `${node.data}, `));
    console.log(`Post Order: ${postOrderString}`);
    console.log();
}

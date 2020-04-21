class TrieNode<T> {
  keys = new Map<T, TrieNode<T>>();
  end = false;
  setEnd = () => (this.end = true);
  isEnd = () => this.end;
}

class Trie {
  root = new TrieNode<string>();

  add = (input: string, node = this.root) => {
    if (!input.length) {
      node.setEnd();
      return;
    }
    const character = input[0];
    if (!node.keys.has(character)) {
      node.keys.set(character, new TrieNode<string>());
    }
    this.add(input.substr(1), node.keys.get(character));
  };

  isWord = (word: string) => {
    let node = this.root;
    while (word.length > 1) {
      const character = word[0];
      if (!node.keys.has(character)) {
        return false;
      }
      node = node.keys.get(character);
      word = word.substr(1);
    }
    return node.keys.has(word) && node.keys.get(word).isEnd();
  };

  startsWith = (word: string) => {
    let node = this.root;
    while (word.length > 1) {
      const character = word[0];
      if (!node.keys.has(character)) {
        return false;
      }
      node = node.keys.get(character);
      word = word.substr(1);
    }
    return node.keys.has(word);
  };

  getWords = () => {
    const results: string[] = [];
    const iterateKeys = (node: TrieNode<string>, word: string) => {
      if (node.keys.size) {
        const nodeKeys = node.keys.keys();
        for (let i = 0; i < node.keys.size; i++) {
          const character = nodeKeys.next().value;
          iterateKeys(node.keys.get(character), word.concat(character));
        }
        if (node.isEnd()) {
          results.push(word);
        }
      } else if (word.length) {
        results.push(word);
      }
    };
    iterateKeys(this.root, '');
    return results;
  };
}

const trie = new Trie();
trie.add('hello');
trie.add('a');
trie.add('any');
trie.add('help');
trie.add('orange');
trie.add('and');
console.log(`trie.isWord('hel')`, trie.isWord('hel'));
console.log(`trie.startsWith('hel')`, trie.startsWith('hel'));
console.log(`trie.isWord('help')`, trie.isWord('help'));
console.log(`trie.getWords()`, trie.getWords());

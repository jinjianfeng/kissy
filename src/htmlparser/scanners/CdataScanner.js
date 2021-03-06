KISSY.add("htmlparser/scanners/CdataScanner", function() {
    return {
        scan:function(tag, lexer, opts) {
            // only terminate when encouter </tag>
            // <textarea><div></div></textarea>
            var content = lexer.parseCDATA(opts.quoteSmart, tag.nodeName),
                position = lexer.getPosition(),
                node = lexer.nextNode();
            if (node) {
                if (node.nodeType != 1 ||
                    !(node.isEndTag() &&
                        node.tagName == tag.tagName)) {
                    lexer.setPosition(position);
                    node = null;
                }
            }
            tag.closed = true;
            if (content) {
                tag.appendChild(content);
            }
        }
    };
});
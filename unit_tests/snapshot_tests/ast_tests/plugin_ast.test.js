const babel = require("@babel/core");
const plugin = require("../../../src/plugin");



it('Test1: empty node existence checking', () => {
    let exampleCode = `<div>{internalflag && <component/>}</div>`
    const { ast,code } = babel.transformSync(exampleCode, {
        plugins: ['@babel/plugin-syntax-jsx', plugin],
        ast: true,
        code: true
    });
    const divContainer = ast.program.body.find(p => p.type === 'ExpressionStatement');
    const divChildren = divContainer.expression.children;
    console.log(code);
    expect(divChildren.length).toBe(0);
});

it('test2: empty node existence checking (more complex one)', () => {
    let exampleCode = `
    import Component from 'react'
    const componentRender = <div>hello</div>
    const app = () => {
        
        return <div>
        {TEST_FLAG && <Component/>}
        {TEST_FLAG && componentRender}
        </div>
        }
    
    `
    const { ast, code } = babel.transformSync(exampleCode, {
        plugins: ['@babel/plugin-syntax-jsx', plugin],
        ast: true,
        code: true
    });
    const topContainer = ast.program.body;
    expect(topContainer.length).toBe(1);
});

it('test3: to check whether a node is intact if given flag is not valid', () => {
    let exampleCode = `
    import Component from 'react'

    const app = () => {
        const componentRender = <div>hello</div>
        return <div>
        {TEST_FLAG12 && <Component/>}
        {TEST_FLAG12 && componentRender}
        </div>
        }
    
    `
    const { ast, code } = babel.transformSync(exampleCode, {
        plugins: ['@babel/plugin-syntax-jsx', plugin],
        ast: true,
        code: true
    });
    const divContainer = ast.program.body.find(c => c.type === 'VariableDeclaration');
    const divFunc = divContainer.declarations[0].init;
    const divParentReturn = divFunc.body.body[1];
    const div = divParentReturn.argument;
    const divChildren = div.children;
    expect(divChildren.length).toBe(5);
    const jsxContainers = divChildren.filter(p => p.type === 'JSXExpressionContainer');
    expect(jsxContainers.length).toBe(2)
});
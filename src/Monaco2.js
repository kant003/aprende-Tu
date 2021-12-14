
import React, { useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

function Monaco2(props) {
    const editorRef = useRef(null);

    const monaco = useMonaco();

    const [code, setCode] = useState("console.log('hola',process.argv)");
    const [result, setResult] = useState('...');
    const [hasErrors, setHasErrors] = useState(false);


    useEffect(() => {
        if (monaco) {
            console.log("here is the monaco isntance:", monaco);
        }
    }, [monaco]);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
    }

    function showValue() {
        alert(editorRef.current.getValue());
    }

    function handleEditorChange(value, event) {
        console.log("here is the current model value:", value);
    }

    const send = async (e) => {

        e.preventDefault();
        console.log('ejecuando:', code)
        const jsonToSend = {
            "language": "js",
            "version": "15.10.0",
            "files": [
                {
                    "name": "my_cool_code.js",
                    "content": editorRef.current.getValue(),//"console.log('hola',process.argv)"
                }
            ],
            "stdin": "",
            "args": ["1", "2", "3"],
            "compile_timeout": 10000,
            "run_timeout": 3000,
            "compile_memory_limit": -1,
            "run_memory_limit": -1
        }
        /*console.log('llamando')
        const rawResponse = await fetch('http://localhost:4000/execute', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify('jsonToSend')
        });
        const content = await rawResponse.json();
*/

        /// 
        const rawResponse = await fetch('http://localhost:4000/execute', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            /*headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },*/
            body: JSON.stringify(jsonToSend)
        });
        const js = await rawResponse.json()
        if (js.run.code != 0) setHasErrors(true)
        else setHasErrors(false)
        setResult(js.run.output)
        console.log(js);
    }

    const runtimes = async (e) => {

        e.preventDefault();
        const response = await fetch('http://localhost:4000/runtimes')
        const content = await response.json();
        console.log('runtimes', content);
    }

    return (
        <div>
            <button onClick={showValue}>Show value</button>
            <Editor
                height="50vh"
                defaultLanguage="javascript"
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
            />

            <button onClick={(e) => runtimes(e)}>Runtimes</button>
            <button onClick={(e) => send(e)}>Enviar</button>
            <br />
            <textarea className={hasErrors ? 'hasErrors' : null}
                value={result}></textarea>
        </div>
    )


}

export default Monaco2;

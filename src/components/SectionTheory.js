import MDEditor from '@uiw/react-md-editor';

function SectionTheory({section}) {
    return (
        <>
        { section.type }
                { section.title }
    <div className="container"> 
        <MDEditor.Markdown source={section.text} />
    </div>
    </>
    );
}
export default SectionTheory;
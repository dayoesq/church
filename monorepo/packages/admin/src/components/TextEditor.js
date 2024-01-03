import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function TextEditor({ value }) {
    return (
        <Editor
            apiKey={process.env.TINYMCE_API_KEY}
            init={{
                plugins:
                    'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar:
                    'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat'
            }}
            initialValue=''
            value={value}
        />
    );
}

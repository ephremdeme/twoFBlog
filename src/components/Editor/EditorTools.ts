import { storage } from '../../firebase/firebase';
import MembersOnly from '../../plugins/only-members-plugin';
const Embed = require('@editorjs/embed');
const Image = require('@editorjs/image');
const Header = require('@editorjs/header');
const List = require('@editorjs/list');
const Underline = require('@editorjs/underline');
const Quote = require('@editorjs/quote');
const Table = require('@editorjs/table');
const Delimiter = require('@editorjs/delimiter');

export default {
    Embed:{
        class: Embed,
        inlineToolbar: true
    },
    Image:{
        class: Image,
        inlineToolbar: true,
        config:{
            uploader: {
                uploadByFile(file: File) {
                    return new Promise((resolve, reject) => {
                        storage.ref(`images/${file.name}`).put(file).on(
                            "state_changed",
                            snapShot => {},
                            error => {
                                console.log(error);
                                reject(error)
                            },
                            () => {
                                return storage 
                                    .ref('images')
                                    .child(file.name)
                                    .getDownloadURL()
                                    .then((url: any) =>{
                                        resolve({
                                            success: 1,
                                            file: {
                                                url:url
                                            }
                                        })
                                    });
                                }
                        );
                    }) 
                }
            }
        }
    },
    Header:{
        class: Header,
        inlineToolbar: true
    },
    List: {
        class: List,
        inlineToolbar: true
    },
    Underline: {
        class: Underline,
        inlineToolbar: true
    },
    Quote: {
        class: Quote,
        inlineToolbar: true
    },
    Table: {
        class: Table,
        inlineToolbar: true
    },
    Delimiter: {
        class: Delimiter,
        inlineToolbar: true
    },
    MembersOnly:{
        class: MembersOnly
    }
}
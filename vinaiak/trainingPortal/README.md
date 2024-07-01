# vinAIak training portal documentation
It is a website, for DESKTOP ONLY, to `train` the chat bot provided by vinAIak to your organisation.  
`train`: Editing the data based on which the chat bot will reply.
## Choosing topics
After you login with your credentials, you will see a line of `topics` upon which the chatbot is trained. Now, `topics` can be of two types:
- `File`: It contains the data, which can be text and files, based on which the bot will reply when question is asked related to that topic. Clicking on it opens the `editor`.
- `Folder`: It contains further more child `topics` which can be of any type, `files` and/or `folders`. Clicking on it creates a new line of it's child `topics`.

This allows topics to recursively contain child or sub-topics. You can always see the hierarchy of a `topic`, the parent `topics` to which it belongs, by seeing the choosen topic in every line. Even while editor is open.
## Operations
There 4 types of operations or editing, you can perform on a `topic`: `create`, `modify`, `delete` and `rename`.
### Create
To create a new `topic`.  
Creating a new `topic`:
1. Hover on right of the line in which you want to add the new `topic`
2. Choose the type of topic `file` or `folder`
3. Type the `topic` name in the box using keyboard
4. Hit Enter key to create the new `topic`

You can hit Esc key any time to exit creating new `topic`   
The newly created `topic` is shown with a green background 
#### Tip
Always try to put a descriptive topic name to a `topic` to get better response from chatbot.


Example: Name like `events` doesn't make anything immediatly clear about it's content. So if you put data about college fests in it, chatbot will never be able to guess that.  
Rather try making a folder of name `events`, and within that make the file of name `college fests` and put the relevent data in that file.  
If the college fest data is too much like more than a page, try breaking it into further `topics` like for every college fest `BITotsav`, `Pantheon`, `vinotsav` etc. and there put their respective data.
### Modify
To modify an existing `topic` of type `file`.  
Modifying an `file`:
1. Navigate to the `file` by choosing parent `topics` 
2. Click on the `file`

This will launch the `editor` to edit or modify the file. More about `editor` and it's buttons is in next topic.  
The modified `topic` is shown with orange background
### Delete
To delete an existing `topic`  
Deleting an `file`:
1. Navigate to the `file` by choosing parent `topics`
2. Click on the `topic`
3.
    - If it is a `file`, the `editor` will open where you can click at `delete` button at bottom or hit delete key to delete the file.
    - If it is `folder`, it's child `topics` will be shown but since your last click was on the parent `topic`, which you want to delete, the keys are bound to parent `topic` only. Hence hitting delete key will delete the `topic`.

    **NOTE**: Deleting a `topic` will delete all the children `topics` recursively, automatically.


The deleted topic will be shown with red background
#### Restoring deleted topic
Simply click on the deleted topic to restore it. Like deleting restoring will also restore it's children recursively.


**Note**: It will retore with your all changes made in this session too. Means your all hardwork in this session won't vanish because of a accidental delete key press
### Rename
To rename an existing `topic`  
Renaming a `topic`:
1. Navigate to the `file` by choosing parent `topics`
2. Click on the `topic`
3. Hit F2 key to rename the `topic`  
If the `topic` is a file then `editor` will open but you can still hit F to close and rename the file
4. Type the new name following naming tip provided under create heading.
5. Hit Enter key to rename the file

You can hit Esc key any time to exit renaming `topic`  
Renamed `topic` is shown with sky blue font color
## Editor
It the one which allows you to write text and upload files using which chat bot will respond. It is made up of 3 parts:
1. Heading: It shows the hierarchy to which the file which you are editing belongs. Basically the choosen `topic` at each line to reach this file
2. Text Editor: Here you can type the data of the `topic` as well as upload files using 3rd button of button ribbon. It supports all usual key function like `Ctrl+z` for undo etc. (but not delete key for backward delete since it is used to delete the file)  
**Note**: The new file is always placed at the end of the text editor but you can cut or copy it like a text and paste it wherever you want to.
3. Button ribbon: It has 4 buttons:
    1. Restore: To restore to the original file which is currently already saved in the server. Basically undo all the changes.
    2. Delete: To delete the `file` or `topic`.
    3. Upload files icon: To upload files.
    4. Close editor: To close the editor and go back to `topics` hierarchy.  
    Save button is not part of editor ribbon. It's just always available at it's place even when editor is open.

**Note**: Only image files are shown within the editor and other all files are shown as link upon which you can click to open it in a new tab.  
The newly uploaded files are shown with a green background
## Save
It is button always the bottom of the workspace. Clicking on this opens the list of changes you have made.


The list contains the `operation` you have made and the `topic` name in hierarchical form (showing it's parent `topics` also) which is also a button. Clicking on it navigates you to the topic except in case the operation is creating a new `file topic` or modifying a `file`, it opens the editor directly.

**Note**: If you have done any `operation` to a `topic` but then deleted a parent topic of it then only deleting a parent topic will be shown since in that case all of it's children are already meant to be deleted. So there is no point of calling it's child to be modified or anything.

Now clicking on it again, while list is open, will save the changes on server and it **CANNOT BE REVERSED!!** since old files are deleted and are replaced by your new files.
So think twice before clicking that
# Thank you
We are proud to be choosen by you. If you have any doubt about anything, just put it on github issues. We will try resolving it ASAP!
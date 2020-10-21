
# CRUD Rules


## 1. **Courses**

+ Course ID (Auto id generated)
+ Add, Delete, or update through Firestore is a must
+ All fields must be created manually for the first time.
+ All fields values can be changed through the *Data Entry App* except the following: 
  **Course title / Media filename / Media type**
+ Those fields values must be entered manually.

+ The remaining fields values should be created/modified through the *Data Entry App*, as following:

  ### 1.1. Description

  + Can be created/modified or updated through the *Data Entry App*.
  + Delete can be done only by leave the Description textbox empty.


  ### 1.2. Category
  
  + The default value is **0** - (i.e. free course)
  + The value could be changed through the *Data Entry App*.

      

  ### 1.3. Concepts

  + (*based on) Course ID - within Courses Object
  + Every concept has an unique ID (auto sequential numbers) - e.g. ArabicA11C19
  + Concept-ID must be an unique ID among all courses

  + **Add** -> would be saved into the course Object
  + Concepts would be used in the *Tracing App*.
  + Concepts could be removed or changed in the *Main App*.

  + **Delete** -> cascade to all scene headers files
  + **update** (changing the Concept-Text) => cascade to all scene headers files


  ### 1.4. Lessons

  + (*based on) Course ID - within Courses Object
  + Also has field of their Module. (Module-ID)
  + Every lesson has an unique ID (auto sequential numbers) - e.g. ArabicA11L5
  + Lesson-ID must be an unique ID among all courses

  + **Add** -> Would be saved into the course Object
  + Lessons would be used in the *Tracing App*.
  + Lessons could be removed or changed in the *Main App.*

  + **Delete** -> (Condition) There are no scenes refer to it. (must be empty)
  + **update** (changing the Lesson-Title) => cascade to all scene headers files
   


  ### 1.5. Modules
  
  + (*based on) Course ID - within Courses Object
  + Every Module has an unique ID (auto sequential numbers) - e.g. ArabicA11M2
  + Modules-ID must be an unique ID among all courses

  + **Add** -> would be saved into the course Object
  + **Modules** would be used in *Tracing and the Main App*.

  + **Delete** -> (Condition) There are no lessons nor scenes refer to it.
  + **update** (changing the Lesson-Title) => cascade to all scene headers files


  ### 1.6. To be used later

  + (*based on) Course ID - within Courses Object
  + These fields to be used in the *Main App.*
  + **Progress** is an indicator of the course completion.
  + Those fields Have default values and can't be entered or changed through the *Data Entry App*.
  + **C-New-Field-No**: a future numerical field for the course object. (may or may not be used in the Main App version 1)
  + **C-New-Field-Txt**: a future textual field for the course object. (may or may not be used in the Main App version 1)

----------------

## **2. Skills**

+ Has Auto generated ID.
+ Every file has two fields Skill-ID and Skill-Text.
+ Skill-ID is an unique id among all courses. e.g skill_R (Reading Skill)
+ Skill-ID is entered manually through *Data Entry App*.
+ Every Skill has its own object. and can be used in scenes.
+ Every scene has one or more skills.

+ Skills would be used for *Tracing App* and maybe for *Main App* too.
+ Can be created through the *Data Entry App*.

+ **Delete** -> (Condition) there is no scene refers to it.
+ **Update** (changing the Skill-Text) => cascade to all scene headers files


----------------

## **3. sceneTypes**

+ Has Auto generated ID.
+ Every object has two fields sceneT-ID, sceneT-Text.
+ **sceneT-ID** is an unique id among all courses. e.g. code_fillblank
+ **scene-ID** is entered manually through *Data Entry App*.

+ Every scene has one type.
+ These would be used for *Tracing and Main App*.
+ Can be added through the *Data Entry App*.

+ **Delete** -> (Condition) there is no scene refers to it.
+ **Update** (changing the sceneT-Text) => cascade to all scene headers files


----------------

## **4. sceneHeaders**

+ Its Id programmatically entered. which consists of the Course ID + The scene sequence.
+ Each scene has on sceneHeader object which contains meta info. of that scene.
+ The sceneHeader has fields refer to which course, module, and lesson it belongs: **Course-ID, Module-ID, Lesson-ID.**
+ Those fields created automatically when the sceneHeader being created by using the *Data Entry App.*
+ Each sceneHeader object connected with a scene object through the **Scene-ID**.
+ **Scene-ID** is generated automatically.
+ Scene object must use this Scene-ID as its primary **ID**.
+ It has also the following fields:


  ### 4.1. Scene-Title
  + Can be created/modified through the *Data Entry App*.
  + **(Add)** Entering a scene title created a new sceneHeader object.
  + **(update)** Can be changed to a new title through the *Data Entry App*.
  + **(Delete)** Could be used to delete a sceneHeader object.
  + **(Warning)** Deleting a sceneHeader would delete also the corresponds scene.

  ### 4.2. Scene-Desc
  + Each sceneHeader contains a description field for the scene. *[optional]*
  + Can be created/modified through the *Data Entry App*.
  + Could be used or removed later for the *Tracing or Main App.*

  ### 4.3. Scene-Type
  + The most important field in the sceneHeader.
  + Determines how to build the scene.
  + Must has a value, otherwise the scene object would be null.
  + Contains a unique code, where it refers to one of the sceneTypes objects
  + (warning) Changing its value after the scene being built would destroy the scene object and create a new one.

  ### 4.4. Concepts / Skills
  + A collection of the scene related concepts / skills.
  + Can be added/deleted through the *Data Entry App*.

  ### 4.5. Flags
  + **Send-To-Teacher** : This can be determined through *Data Entry App* and also later via *Tracing App*
  + **Book-Type** : This can be determined through *Data Entry App* and also later via *Tracing App*
  + **Scene-seq**: - Determines the displayed sequence of the scene later in the *Main App*
                   - This value would be inserted/modified through *Tracing App*
  + All thoses values would be created with the sceneHeader object and have default values.

  ### 4.6. To be used later
  + These fields would be used for the *Main App* and they would be created within the sceneHeader obj
  + All those fields have default values and would be modified while the *Main App* in running state.
  + **flag-finished** : Indicates whether the scene is completed or not. 
  + **flag-available**: - Indicates whether the scene should be available (displayed) for the user or not.
                        - The availability would be based on some conditions. *(requires the supervisor Algorithm)*
  + **flag-review** : - Indicates whether the scene is displayed for the first time or it is in a review state.
                      - The review state would be based on some condition. *(requires the supervisor Algorithm)*
  + **Points** : Indicates how much does it cost for the user to send the scene (exercise) to be corrected.
  + **Score** : - Indicates the weight of the scene compared to the whole course.
                - Used in *the supervisor Algorithm*
  + **SH-New-Field-No**: a future numerical field for the sceneHeader object. (may or may not be used in the Main App version 1)
  + **SH-New-Field-Txt**: a future textual field for the sceneHeader object. (may or may not be used in the Main App version 1)



----------------


## **5. Scenes**



## 6.






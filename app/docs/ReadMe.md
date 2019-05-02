# WanezToolsGD (v0.5.4)

*Unofficial addition to the official Grim Dawn - Modding Tools*

---
> 1 [Introduction](#1)
>> 1.1 [Installation](#1.1)

>> 1.2 [The Future](#1.2)

> 2 [Mastery Tools](#2)
>> 2.1 [Setup](#2.1)

>> 2.2 [Skill Allocation](#2.2)

> 3 [Item Tools](#3)
>> 3.1 [Materia/Components](#3.1)

> 4 [Merger Tools](#4)
>> 4.1 [Basics](#4.1)

>> 4.2 [Mastery Merger](#4.2)

>> 4.3 [DBR Merger](#4.3)

>> 4.4 [Tag Merger (ToDo)](#4.4)

>> 4.5 [Script Merger (ToDo)](#4.5)

>> 4.6 [Order Of Things](#4.6)

>> 4.7 [Tips For Usage](#4.7)

> 5 [Other Tools](#5)
>> 5.1 [BBCode [Experimental]](#5.1)

> 6 [License and Credits](#6)

---

---
<a name="1"></a>
## 1 - Introduction
These tools will not replace the official Modding Tools from Crate, but they make certain tasks easier and less tedious.

Because v0.3.0 and above was made while I had the Expansion installed I cannot guarantee all Features are working properly without it, there shouldn't be any major conflicts, but consider yourself warned, it is possible you are using a part of the tool that doesn't work without the Expansion (in game). I will try the mark these parts, but it may not always be the case.

This Readme is more than just a collection of features, it will have small guides on how to use the tool and how things were intended to be used. You can also access it inside the tool by going to "Docs/ReadMe".

<a name="1.1"></a>
## 1.1 - Installation
> 1.1.0 [Get The Program](#1.1.0)

> 1.1.1 [Settings](#1.1.1)
>> 1.1.1.0 [Basics](#1.1.1.0)

>> 1.1.1.1 [Mastery](#1.1.1.1)

<a name="1.1.0"></a>
### 1.1.0 - Get The Program
Download **WanezToolsGD-Setup-X.Y.Z.exe** from the releases page and start it when the download is done. It may trigger a false positive from your firewall, because it is an unsigned Installer. When the installation is done you have a new Icon on your Desktop you can use to load the Program.

<a name="1.1.1"></a>
### 1.1.1 - Settings
The first thing you should do is go into **Settings** by using the button on the upper-right. Go straight to **Grim Dawn**. You should also set up the Mastery Tools in the **Mastery** Section of these Settings, you will need them for the Merger Tools as well.

*Last updated with v0.3.0 - pictures can be out of date*

<a name="1.1.1.0"></a>
#### 1.1.1.0 - Basics
![Grim Dawn - Settings - Example](https://user-images.githubusercontent.com/20875155/31731437-5830eb4a-b435-11e7-9d3c-9bdc50d7f290.png "Grim Dawn - Settings - Example")

| | |
| ---: | :--- |
| **Working Directory** | same as you have for Asset Manager (I'm using the default one, personal preference). |
| **Install Directory** | where Grim Dawn is installed |
| **Mods** | the name of the mod (the folder), separated by a new line. An Example is in the picture with multiple mods. **Not Required For Merger Tools** |
| **Active Mod** | pick the mod you are currently working on. **Not Required For Merger Tools** |

*Mods/Active Mod: may not be required, but if you intend to add <a href="#2.1.2">Mastery Combination Tags with this Program</a> you need to fill out these fields and the Mastery fields after Merging*

<a name="1.1.1.1"></a>
#### 1.1.1.1 - Mastery
![Mastery - Settings - Example Part 1](https://user-images.githubusercontent.com/20875155/31739620-c9890dae-b44e-11e7-969d-dd74babd824f.png "Mastery - Settings - Example Part 1")

| | |
| ---: | :--- |
| Tags | list of all files in /source/text_en/, if the lists are empty the folder is empty or something in Grim Dawn Settings is wrong. ***If you intend to Merge Masteries, return after the Merge*** |
| **Tags - Skills** | the File for Skill tags |
| **Tags - Classes** | the File for Mastery Name tags |
| PFX | optional, you can copy files from Source to Target with a button - might be more important in the future once I get around to adding features for DBRs using PFX |
| **Source Directory** | in Grim Dawn/source the folder you are using for you Masteries |
| **Target Directory** | inside /mods/mymod/source/ the folder where you want the source PFX to be moved to |

![Mastery - Settings - Example Part 2](https://user-images.githubusercontent.com/20875155/31739618-c96bb1aa-b44e-11e7-897a-ffb959e05321.png "Mastery - Settings - Example Part 2")

You can skip this if you are using the default paths for Skills and Masteries.

| | |
| ---: | :--- |
| **UI Files** | the default should give you an idea, the button files from the Skill Allocation window are going in there |
| **Skill Files** | the default should give you an idea, the skill files go in there |
| Default Paths | optional, it is just a time saver for new Skills and Masteries created with the tool, if you don't have a custom path and are using the default you can leave it empty |
| **UI Files** | Mastery creation can go faster if you don't have to enter the path to the classscreen or trainingbar.tex |
| **Icon Files** | your skill icons, the path generated for new files can look like: "ui/skills/icons/mastery/skillicon_buff_regen_down.tex" same for up if the name of the DBR is buff_regen.dbr |

<a name="1.2"></a>
## 1.2 - The Future
This program is not even anywhere near completion, the way things work are not yet satisfying to me. Certain parts of the Tools are a little clunky and need improvements, especially for beginners, but once you get used to them they save time. So this is the first big thing I try to work on constantly, making the Tools easier to use and faster. I'm also trying to add new features, such as adding items and enemies is going to be huge, but there are also little things I want to include, things like NPC overviews, etc.
As you can see, it's still a long way to go for v1.0.0.

---

---
<a name="2"></a>
## Mastery Tools
Making a new Mastery or just editing an existing one can be tedious, I started these tools for that reason. You are able to directly move skill buttons and mastery buttons around instead of guessing what the x/y coords should be and log into the game to check if they're at the right place.

The capablities for the Mastery Tools go far beyond moving around buttons, you are able to edit the different values of skills and working on Pet Masteries is much easier.

---
<a name="2.1"></a>
### 2.1 - Setup
> 2.1.0 [Set Enum](#2.1.0)

> 2.1.1 [New Mastery](#2.1.1)

> 2.1.2 [Config](#2.1.2)

> 2.1.3 [Selection (UI)](#2.1.3)

<a name="2.1.0"></a>
#### 2.1.0 - Set Enum
Using this button will set enums for all the masteries referenced in malepc01.dbr, the mastery referenced at skillTree19 will have its MasteryEnumeration set to 19. I does that for every entry, it was the first step towards a Mastery Merger a while back.

<a name="2.1.1"></a>
#### 2.1.1 - New Matery
You can create a new Mastery with a button, this will open a new window where you can enter the different settings.

**ToDo: Example**

<a name="2.1.2"></a>
#### 2.1.2 - Config
* Click on a Mastery at the top and it will show you that Mastery's tags including Mastery Combos.

![Mastery Edit - Tags](http://wanez.de/misc/WanezToolsGD-v0.1.2_Mastery_tags.png "Mastery Edit - Tags")
* ***More Features are In Progress.***

<a name="2.1.3"></a>
#### 2.1.3 - Selection (UI)
* buttons can be moved by dragging them to the desired location, using the fields at the top

![Full Example (gif made using Grim Quest Source)](http://wanez.de/misc/selection_full-v0.0.5.gif "Full Example (gif made using Grim Quest Source)")
* Buttons can be place above or below of another by double-clicking the button, double-clicking the button above and than double-click the button to move below the one you started with

![Double Click Example (gif made using Grim Quest Source)](http://wanez.de/misc/WanezToolsGD-v0.0.5_MasterySelection_dblclick.gif "Double Click Example (gif made using Grim Quest Source)")
* ***More Features are In Progress.***

---
<a name="2.2"></a>
### 2.2 - Skill Allocation
> 2.2.0 [](#2.2.0)

> 2.2.1 [UI](#2.2.1)

> 2.2.2 [Edit Skill](#2.2.2)

> 2.2.3 [Edit Pets](#2.2.3)

<a name="2.2.1"></a>
#### 2.2.1 - UI
* Skill Icons can be shown if they are .tga or .png
* Use Drag & Drop to move skills around
  * changes to the coords are made immediately
  * Skill Tiers are changed respectively
* Create Transmuters and/or Modifiers
  * click the "parent" skill
  * use the button "Set Connector"
  * now click on the skill you want as a modifier for your "parent" skill
* To remove connections just use the button "del. Connectors"
* to save all data into the skilltree and ui classtable use the button "Save DBR"

<a name="2.2.2"></a>
#### 2.2.2 - Edit Skill
* double-click a skill on the Skill-UI to edit it (or use the button on the right)
* change Item stats with for all available skill levels just by changing a few base values

![Skill - Edit Properties](http://wanez.de/misc/WanezToolsGD-v0.1.2_SkillEdit_properties.gif "Skill - Edit Properties")

<a name="2.2.3"></a>
#### 2.2.3 - Edit Pets
* Same window as **Edit Skill**
* Edit Pet Tag (Tags)
* Edit spawnObjects (Files)
* create pet file if file in spawnObjects doesn't exist (it will use the file from the previous level - this will require at least 1 pet file)
* skill name/level can be changed from inside the program
* fields can be hidden to avoid cluttering the screen with every skill a pet has (and makes editing wanted skills easier)
  

---

---
<a name="3"></a>
## 3 - Item Tools
> 3.1 [Materia/Components](#3.1)

<a name="3.1"></a>
### Materia/Components ###
* Vanilla path is checked in your mod folder and than in the extracted game files.
* if you are changing a vanilla file, it is copied over to your mod's directory with the change you made.
* tag adjustments depending on Qualifier changes.

---

---
<a name="4"></a>
## Merger Tools [Experimental]
There will be issues with this first release, let me know about anything, things you liked, things you hated, things you would like to see, ... you get the idea.

If you have masteries to merge you should start with the **Mastery Merger** and move on to the **DBR Merger** after. Using the Mastery Merger will remove alot of unnecessary files and make the DBR Merger easier to use, because you don't have to bother with those files anymore, otherwise you would get malepc01.dbr for each mod and all the other files Mastery mods have to have.

> 4.1 [Basics](#4.1)
>> 4.1.1 [New Project](#4.1.1)

>> 4.1.2 [Primary Mod](#4.1.2)

>> 4.1.3 [Generate Mod](#4.1.3)

> 4.2 [Mastery Merger](#4.2)

> 4.3 [DBR Merger](#4.3)
>> 4.3.1 [Introduction](#4.3.1)

>> 4.3.2 [Loottables](#4.3.2)

>> 4.3.3 [Mastery](#4.3.3)

> 4.4 [Tag Merger (ToDo)](#4.4)

> 4.5 [Script Merger (ToDo)](#4.5)

> 4.6 [Tech & What Is Happening](#4.6)
>> 4.6.1 [Individual Mods](#4.6.1)

>> 4.6.2 [DBR](#4.6.2)

>> 4.6.3 [Speeding Up The Process](#4.6.3)

>> 4.6.4 [Data Storage](#4.6.4)

>> 4.6.5 [File Watcher (ToDo)](#4.6.5)

> 4.7 [Tips For Usage](#4.7)
>> 4.7.1 [gameengine.dbr](#4.7.1)

---
<a name="4.1"></a>
### 4.1 - Basics
Settings in ***Grim Dawn*** and ***Merger*** are required for the Merger Tools. Editing Mastery Combination Tags will also require ***Mastery*** Settings to be set, but only after the first Mastery Merge of a Project.

You should also know how to **Build** a Mod and how to extract the Game Files. You should also have a basic understanding of Modding, while you don't have to edit any file with the DBR Editor, it still helps to know how to fix issues especially during the ***Experimental Phase*** of the Merger Tools. Maybe some day with a working CLI to build the mod this will be fully automated and not require any knowledge, but until then some basics are good to know:
* How to set up Asset Manager
* How to create an asset for Tag files
* How to exctract Game Files (and Templates)
* How to Build a Mod in Asset Manager

*The Tool is getting its Vanilla DBR from /database/, make sure files in /mods/gdx1/database/ have overwritten those files, or xpac files are not being loaded!*

<a name="4.1.1"></a>
#### 4.1.1 - New Project
Use the ***Merger*** button on the Navigation to manage your projects.

You can create a new project with the Button on the right ***New Project.*** This will create a new List Item, no files, yet. When you click on the new List Item you can see different options. You can change the Project Name, select Mods to merge and choose a Primary Mod for your own files.

Your Projects are saved inside a Settings file for the Tool. Everything set up for the Project is saved in side this file as well. This means after the initial setup of your Compilation you don't have to bother with it again, the Program will check for updated files on its own.

<a name="4.1.2"></a>
#### 4.1.2 - Primary Mod
This can be set in the Merger's Project Settings with a ComboBox, the Primary Mod has priority above all other mods. The Primary Mod file is loaded as a base, fields you mark will override those fields inside the Primary Mod's dbr.

The usage I had in mind for this is to make a mod with the files that are special to the Compilation, SkillTree fields in pc.dbrs are the best example, you wouldn't want to mess up those files with a mod update, enum files could be handled like that as well, just need the .dbr where the Mastery Enum is defined and the Tool will ignore those files unless you want to update a field. In the example of Enum files, there is more inside than the Mastery Enumeration, mark all fields except **masteryEnumeration** and the tool will update the DBR whenever necessary and leave the Mastery Enumeration field as you need it.

<a name="4.1.3"></a>
#### 4.1.3 - Generate Mod
The Merged Mod can be generated by using the ***Generate*** Button, which will only appear if you have a Project selected. It may take a moment to copy files and generate the files from the DBR Merger.

---

<a name="4.2"></a>
### 4.2 - Mastery Merger
After choosing the Project and selecting Mods you can jump right into the Mastery Merger. You will see the referenced dbr in malepc01.dbr for each Mod put together to pick the Mod you want to use it from and you are able to set the Mastery Enumeration.

![Mastery Enumerations - using Mods: Diablo 3 and Grim Quest in the Example, because I had them on my HD ](https://user-images.githubusercontent.com/20875155/31855043-f623a044-b6a2-11e7-8dc0-5c50a162d24a.png "Mastery Enumerations - using Mods: Diablo 3 and Grim Quest in the Example, because I had them on my HD")

*using Mods: Diablo 3 and Grim Quest in the Example, because I had them on my HD - you can also see I did not copy my gdx1 records over after the last extraction, because the program has only found 6 Vanilla Masteries, make sure you do, it's fine for this example though*

That's it, Masteries will be created when you use the button ***Generate***. All this is saved and only requires your attention again when you add a mod with a new Mastery, otherwise keep using the ***Generate*** button from the DBR Merger, since you are updating Mastery Skills from there. The Mastery Merger is only for Enum set up.

![Mastery Selection Template](https://user-images.githubusercontent.com/20875155/31854638-dcc7a952-b69c-11e7-89aa-c2b5d2b29bd1.png "Mastery Selection Template")

The Picture shows how buttons are being placed when you merge Masteries for the first time, Art-Assets are going into a new folder for easier editing (source/WanezTools/). You can use them as you like: delete them, change them or use them - created assets are there as well, so you don't have to worry about that either, just Build with AM after using the Tool. They are only being created if skill_classselectiontable.dbr doesn't exist in the project. All button/text DBRs are created as well with the coords on the Picture, updating Masteries with the Tool will only update the fields inside skill_classselectiontable.dbr, so any changes you are making yourself need to happen each time or inside the Primary Mod (because it loads the dbr in there or if it doesn't exist inside the Primary Mod it uses the one from "Vanilla/database/").

Any changes you are making to button or label files remain until you delete skill_classselectiontable.dbr and use the ***Generate*** button, without that dbr everything is going to be overwritten. As long as you don't delete that file you can change the Art move buttons and change whatever you want.

Tags are also part of the generation process, they are placed in a new tag file that should guarantee to be the first tag file in the folder (aaWT_MergedMastery_[ProjectName].txt - or other files would override a tag), Vanilla tags are ignored if you are using them, you will have to create an isset with AM for the Tag file, because of the different naming I cannot add the asset I used. I've decided to add the Project's Name to have different Tag files for localizations, as it would otherwise conflict with translations if someone used different mods merged with this Tool. Combo Tags are dependant on Enum, so they are being generated inside that file. You can use the <a href="#2.1.2">Mastery Tools to add the missing Mastery Combinations</a> per Hand (since there is no way of knowing what they will be).

---
<a name="4.3"></a>
### 4.3 - DBR Merger

<a name="4.3.1"></a>
#### 4.3.1 - Introduction
You can see Duplicate Records and Unique Records, they are just that, Unique Records are being copied over if they are newer than the ones in the Project (this is not checking the files inside the Project folder but the timestamp inside the database). You can ignore a DBR by clicking on it first and checking the checkbox after. This may expand to Directories in later versions, if it is a feature used.

Dupe Records are the DBR in at least 2 Mods, when clicking on the entry you can see all the fields with multiple entries, check the fields you would like to keep. Empty fields are only considered if one DBR as an empty field where the other DBR has a value set, I believe it is better to know about it than just write a value in those fields and get confused about why something is not right.

<a name="4.3.2"></a>
#### 4.3.2 - Loottables
Select the fields you **don't** want to have in your Loottable is enough, the program will generate a new Loottable based on the remaining fields. The reason for making this the opposite way is, because I believe most of the time you want to keep all entries and just remove dupes, which is done already and only excluding a drop remains.

If a field is using another field, like a Loottable usually has a lootName and a lootWeight. The lootWeight will be attached to the lootName and placed at the right position. Currently the only way to override a value is by having that entry with a new lootWeight inside the Primary Mod. Multiple entries for lootName won't be shown, keep in mind loot1Name and loot2Name are different arrays, duplicate DBR entries will be shown for it including their loot1Weight or loot2Weight depending where it belongs to. The number at the end lootNameX doesn't matter, this is being rearranged when the new DBR is generated.

<a name="4.3.3"></a>
#### 4.3.3 - Mastery
The Mastery merger is still in progress. You will be able to merge the necessary files for Masteries to include in your Primary Mod, this will include tags for Mastery Combinations and SkillTree configurations (or Mastery Enumeration).

---
<a name="4.4"></a>
### 4.4 - Tag Merger
May not be there initially, but it is a merger that will merge all tag files together into one. This will prevent issues occuring for Mastery Names and other duplicate entries. The files from the Primary Mod are loaded last and override existing entries.

This is likely going to mess up translations and they need to be merged as well, so I'm not sure if I end up making it that way.

---
<a name="4.5"></a>
### 4.5 - Script Merger
This is a larger project including an attempt at Visual Scripting for Lua, so this will be in much later.

---
<a name="4.6"></a>
### 4.6 - Tech & What Is Happening

<a name="4.6.1"></a>
#### 4.6.1 - Individual Mods
The Program starts by getting all folders inside the Directory set in the Settings. These are the mods' Folders displayed inside the Tools. By adding a Mod the Program will load the Mod's database files (this may take a moment, you can add the next Mod when it's finished).

**Note:** if you are changing Mod files after they have been loaded, you need to either restart the Program or use the Reload Button.

<a name="4.6.2"></a>
#### 4.6.2 - DBR
Probably the largest piece of the Merge Tools. It starts by getting every file in the database folders, but it won't parse them right away, because it would take to long, instead it saves the full path inside the settings and checks for a timestamp, the timestamp is for mod updates, so files can be ignored if they have not been updated, no need to copy old files over.

Those DBRs with duplicates in other mods will show up in a separate list for you to check the differences. Since it would once again be pointless to display fields with the same values, you will see only those with different values and you can mark the ones you want to use in your Compilation.

**In Progress:** You can also compare DBRs to their Core counterparts, this could be interesting for gameengine.dbr to see if anything has changed since the last Grim Dawn update.

<a name="4.6.3"></a>
#### 4.6.3 - Speeding Up The Process
If you had to check duplicate fields each time it wouldn't really make a difference to have a tool for it. Your settings are being saved and applied each time you're updating your Compilation.

<a name="4.6.4"></a>
#### 4.6.4 - Data Storage
The button ***Reload Data*** is to reparse .dbr, this is not performed each time the list is generated, since it would take to much time in some cases. Once you click on DBR Setup and the list is loaded, all .dbr for duped Records are being parsed to accurately display their status, doing this each time you go into a file and change a setting and load the list again by using the Back button would cause the DBR to be parsed again, this was disabled to reduce loading times for larger projects.

You likely won't need to do this, unless you are updating a Mod while using the program.

<a name="4.6.5"></a>
#### 4.6.5 - File Watcher
All of this manually reloading of things could be avoided if I hadn't had issues with certain paths using a File Watcher Module, but the one I was using didn't like braces and to avoid weird issues and confusion I'm just gonna go with manually reloading of stuff. The File Watcher Module received an update since than, so I'll look into it later.

---
<a name="4.7"></a>
### 4.7 - Tips for Usage

<a name="4.7.1"></a>
#### 4.7.1 - gameengine.dbr
*this is not only useful for compilations but for everyone modifying the gameengine.dbr*
* Changes you want to have go either into the Primary Mod or are part of other Mods
  * Let's assume playerDevotionCap in Primary Mod is 59
* find gameenginge.dbr in one of the lists, if at least 2 mods have it it will be in **Dupe Records**, if only one has it you will have to go through **Unique Records** they are not visible right away, because a long list takes time to load, you can make the list visible by using the **Show Records** button on the right.
* when you have found it, click on it and you should see two checkboxes **Ignore** and **Use Vanilla** click on **Use Vanilla** this will bring you back to the lists, this time gameengine.dbr is going to be in **Dupe Records** and the tool should take you to it right away, no need to search it.
* click on it once again to see the differences, if nothing shows the files are identical, but you should see a list of fields. Vanilla values are after the field name (FieldName - Vanilla Value). Only fields with different values than Vanilla are listed, mark the ones you wish to override Vanilla with by clicking on them (they will appear green).
  * in this example playerDevotionCap (Vanilla should be at 55 in case of an xpac file, and your mod at 59)
* when the field is green use the **Back** button to return to the records lists. You can either continue with other dbrs or use the **Generate** button
  * new playerDevotionCap is 59
* next time there is an update to the gameengine file you don't need to do anything, simply use the **Generate** button.
  * new playerDevotionCap is 59 again, the program remembered the field you wanted to override

---

---
<a name="5"></a>
## 5 - Other Tools
> 5.1 [BBCode](#5.1)

<a name="5.1"></a>
### 5.1 - BBCode [Experimental]
* Markdown to BBCode Converter.
* While this was something I made for myself I'm leaving it in the Tool for everyone to use.
* Markdown is easy to get into and easy to write texts with different headers and lists.
* write Markdown on the left and see the converted text in Forum BBCode on the right.
* change the colors of headers.
* change font style of headers.
* the button "Copy BBCode" will copy the contents for the forum to the clipboard and you can just paste it in a new post on the forums.
* you can save the text by using the button "Save MD" and update it with "Update MD".
  * when you are changing the title and use "Save MD" a new entry is created with the text, using "Update MD" will override the old entry with the new title.
  * you may also delete entries with the "Delete MD" button, but unlike the other two, this will ignore the title.
  * changes are saved automatically, you don't really need the button "Update MD" unless you want to change the title or save the color/font changes.
* you can start a new text simply by changing the title and using the "Save MD" to create a new entry, after that just delete the contents and write your new text. (if you remove the text first, it will overwrite the old one - deleting your work)
  * a nice sideeffect is you will save your settings and colors/font styles will apply to your new text.
  * only changing the title without saving it will still overwrite the old text under the old title, because changes to a title need to be submitted first.

---

---
<a name="6"></a>
## 6 - License and Credits
* the program is using Electron (Node.js + Chromium)
  * modules used are under the MIT License
* the following files have not been written by me, information can be found inside the files
  * app/lib/moment.js
  * app/lib/tga.js
* I used Grim Quest source to make the tool
  * Special Thanks to ASYLUM101 for testing the program and providing feedback and ideas to improve the tool



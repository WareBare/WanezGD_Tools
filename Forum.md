*Change colors for Affixes, Item names and MI to quickly see a difference. Rare Affixes will be colored as such, without changing the color of the Item's name itself and MI will appear different from their rarity's default color. You may also see Properties such as Damage Types in different colors, this allows you to decide at a glance if an item is good for your build.*

---
Keywords for Search: Grim Dawn, Rainbow Mod, Rainbow Filter, Color Coding, Item Filter, Font Highlighting

---
# Table of Contents
1. [Introduction](#section-intro)
1. [Installation](#section-setup)
1. [Overview of Features](#section-features)
1. [Color Presets](#section-presets)
1. [Pictures](#section-img)
1. [Downloads &amp; Useful Links](#section-assets)

---
<a name="section-intro"></a>

# Introduction

The tool and files you can find here will only change the font color of items and properties. These files can be deleted at any time and nothing else is going to change when that happens. Which makes this a non-destructive way of changing the way items are shown in the game (playing both Main Campaign and Custom Game).

*<font color="#EF5050"><em>Please note: Using an outdated version can cause issues in form of "Tag not found: ...", if this is the case make sure you are using the most recent version. When the error persists either remove the files and check if the issue was resolved or report it here first, so that I can verify the bug is not related to this. No need to send Crate on a wild-goose chase.</em></font>*

---
<a name="section-setup"></a>

# Installation

Before doing anything you should close Grim Dawn. Now you can either use a tool or download the files I generated with the tool.


<details><summary><kbd>Custom Game Support (Mods)</kbd></summary>
    <hr>
    Mods are affected by the same files that work for the Main Campaign. If you are using the game without a different Language the files from the download section will work as long as the mod is not changing any tags. New items will obviously require additional files, but I'm not going to be responsible for them.
    I will add the link to a mod's Rainbow Filter files at the bottom, if you have a mod with Rainbow Filter files and the link is missing, let me know and I will add it.
    <hr>
</details>
<br />

<details><summary><kbd>Guide: "How To Use The Tool" that I made and write the required files to the correct location.</kbd></summary>
    <hr>
    <font color="#EF5050">Make sure Grim Dawn is closed, because it can prevent the tool from accessing important files and causes all kinds of weirdness inside the tool.</font>
    <br />If you are having issues following along, you may take a look at the pictures in <code>Picture Guide: "How To Use the Tool"</code><br /><br />
    <ol>
        <li>Download Setup.exe for the tool from the download section at the end.</li>
        <li>Install the tool by running Setup.exe, it should run the tool when finished, if this is not the case, you should find a shortcut on your desktop. (<em><strong>Note:</strong></em> You can uninstall the tool via windows' app remove, like most other software)</li>
        <li>Go to <kbd>Settings</kbd> and enter the path to your Grim Dawn directory with the Game.exe inside.<ul>
            <li><em><strong>Note: </strong></em>If you are using a different language you must select your Language.</li>
            </ul></li>
        <li>A new menu on the left should become visible, go to <kbd>Library</kbd>.</li>
        <li>Inside the library you may select a different Preset, the default is Full Rainbow, if you are happy with it use the button <kbd>Save Colors</kbd> to save it.</li>
        <li>Start Grim Dawn. (if it was still running despite the warning, restart the game)<ul>
            </ul></li>
    </ol>
    <font color="#50AF50">When the files require an update just run the tool and start at step 5.</font><br />
    The tool will download any update to it on its own, you will only have to download Setup.exe once, unless there is an issue with the Auto-Updater of the tool.
    <hr>
</details>

<br />

<details><summary><kbd>Guide: "How To Use Preset-Files" that were generated with the tool by me as Zip.</kbd></summary>
    <hr>
    <font color="#EF5050">This is only for the shipped Languages of Grim Dawn, other Languages or Fonts using Localizations will not work with this! Mods using default tags however, will work perfectly fine with these files.</font><br /><br />
    If you do not wish to use the tool you can download the files as Zip and extract the contents to your Grim Dawn directory.<br /><br />
    <ol>
        <li>Download a Zip marked as [Files] from the download section at the end.</li>
        <li>Go to your Grim Dawn directory and extract the contents. (<em><strong>Note:</strong></em> Root directory of the Zip is Grim Dawn, easiest way is to extract the contents alongside your Grim Dawn directory.)</li>
        <li>You should end up with 6 *.txt files inside <code>/Grim Dawn/settings/text_en/</code> (The all languages pack will come with all text_xx folders for the respective Languages). These files are responsible for changing the colors of Items and Properties in the game. If you wish to play the game without color changes you simply delete those files.</li>
        <li>Start Grim Dawn. (or restart it if the game was running before, the new files need to be loaded in and this only occurs during startup)</li>
    </ol>
    <font color="#50AF50">When the files require an update you must do all these steps again.</font><br />
    You may choose to use either the directory with the game.exe (which is the default for the tool and which works for me) or use the directory in user data. I have had reports where putting the files in user data fixed issues, the choice is yours.<br /><br />
    <details>
    <summary><font color=#50AFAF>Game Directory</font></summary>
    <hr>
        Example Path taken from me: C:\Program Files (x86)\Steam\steamapps\common\Grim Dawn
    <pre>
    |-- Grim Dawn
    	|-- ArchiveTool.exe
    	|-- Grim Dawn.exe
    	|-- settings
    		|-- text_en
    			|-- tags_items.txt
    			|-- tags_ui.txt
    			|-- tagsgdx1_items.txt
    			|-- tagsgdx1_storyelements.txt
    			|-- tagsgdx2_endlessdungeon.txt
    			|-- tagsgdx2_items.txt
    </pre>
    <hr>
    </details>
    <details>
    <summary><font color="#50AFAF">User Data Directory</font></summary>
    <hr>
        Example Path taken from me: C:\Users\Ware\Documents\My Games\Grim Dawn
    <pre>
    |-- Grim Dawn
    	|-- save
    	|-- Screenshots
    	|-- Settings
    		|-- text_en
    			|-- tags_items.txt
    			|-- tags_ui.txt
    			|-- tagsgdx1_items.txt
    			|-- tagsgdx1_storyelements.txt
    			|-- tagsgdx2_endlessdungeon.txt
    			|-- tagsgdx2_items.txt
    </pre>
    <hr>
    </details>
    <hr>
</details>


<br />

When Grim Dawn received a patch and you see "Tag not found: ..." you will have to update the files, however, when using the tool you can simply use <kbd>Save Colors</kbd> and any missing tags will be added, please note new items won't be affected by color changes until the tool receives an update - only "Tag not found: ..." errors will get fixed, unless you are adding missing items to the tool yourself with the help of the <kbd>Tag-Manager</kbd>. If you are not using the tool you will have to wait for me to upload the new Preset-Files, which will happen after I've added all new items and pushed an update for the tool.

All downloads and useful links are in the [section at the end](#section-assets).

---
<a name="section-features"></a>

# Overview of Features

* Prefix and Suffix have the color of their rarity, no matter the item they are on.
* The Item's Name:
  * is in the color of the base item's rarity
  * MI are in different color than an item of the same rarity (rares are green, rare MI are olive)
* Item Style/Quality are a different color (this includes Empowered and Mythical)
* Properties in tooltips:
  * Damage Types have different colors.
  * If you do not want this one - delete `tags_ui.txt` from the files.
* Rainbow Tool can add Mastery names to skills. ([Mastery Marker](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765/361))
* Rainbow Tool can highlight certain texts differently if they are important. ([Special Highlighting](https://forums.crateentertainment.com/t/tool-rainbow-filter-item-highlighting/42765/354))

---
<a name="section-presets"></a>

# Color Presets

*Different Color Presets are available to choose from, some could be available as .zip download others will only be possible with the help of the tool.*

<details><summary><kbd>Full Rainbow</kbd></summary>
    <ul>
        <li>Item Names<ul>
            <li>MI have a different color than items of the same rarity.</li>
        </ul></li>
        <li>Tooltip<ul>
            <li>Each Damage Type has its own color.</li>
            <li>Attributes and other Special stats have their own separate color.</li>
        </ul></li>
    </ul>
</details>
<br />
<details>
    <summary><kbd>Diablo &amp; PoE</kbd></summary>
    <em>Note: Sets don't have the prefixed (S) Symbol, they have a different color.</em>
    <ul>
        <li><span style="background-color:#0F0F0F"><font color="#FFFFFF">Common</font></span></li>
        <li><span style="background-color:#0F0F0F"><font color="#39ABCF">Magic</font></span></li>
        <li><span style="background-color:#0F0F0F"><font color="#FFF62C">Rare</font></span> | <span style="background-color:#0F0F0F"><font color="#92CC00">MI - Rare</font></span></li>
        <li><span style="background-color:#0F0F0F"><font color="#5A039A">Epic</font></span> | <span style="background-color:#0F0F0F"><font color="#FF69B5">MI - Epic</font></span></li>
        <li><span style="background-color:#0F0F0F"><font color="#F3A44D">Legendary</font></span> | <span style="background-color:#0F0F0F"><font color="#FF4200">MI - Legendary</font></span></li>
        <li><span style="background-color:#0F0F0F"><font color="#10EB5D">Set (Epic/Legendary)</font></span> | <span style="background-color:#0F0F0F"><font color="#38592E">MI - Set (Epic/Legendary)</font></span></li>
        <li>Properties are the same as with Full Rainbow.</li>
    </ul>
</details>
<br />

<details><summary><kbd>Basic Highlighting</kbd></summary>
    <ul>
        <li>Item Names<ul>
            <li>MI have a different color than items of the same rarity.</li>
            <li>Sets are not using the (S) Symbol.</li>
        </ul></li>
        <li>Tooltip<ul>
            <li>Damage Type Colors are in three groups (Elemental, Physical/Pierce, Other).</li>
            <li>Damage over Time has a different color than the Direct Damage Types (but using the same grouping, with bleeding into the Physical/Pierce group).</li>
        </ul></li>
    </ul>
</details>
---

<a name="section-img"></a>

# Pictures

*Because we all love them.*

[details="Item Nameplates on the ground"]
![002|471x373](upload://rofqaVADbnm2RPQIbaeFZxi4yp6.jpeg)
[/details]
[details="Item Tooltip: Full Rainbow"]
![003|405x432](upload://3fLLRra2K5hiiskNbTa5pHhvJHa.jpeg)
[/details]
[details="Item Tooltip: Basic Highlighting"]
![BasicHighlighting_Example|376x464](upload://zpQ7KVlAEr6Qhc5PS0Jv3OZbXt5.jpeg)
[/details]
[details="Tooltip Example affecting Component on an item"]
![001|195x499](upload://WkCpn2KvDZUyM5KuGW8DTndbAQ.jpeg)
[/details]

---

<a name="section-assets"></a>

# Downloads &amp; Useful Links



## Downloads (click on the link starts the download)


| Description                                   | Download (click starts download)                             |
| --------------------------------------------- | ------------------------------------------------------------ |
| ***[Tool]*** Customize and Save Color-Presets | [Setup.exe for Tool v0.5.12](https://github.com/WareBare/WanezGD_Tools/releases/download/v0.5.12/WanezGD_Tools-Setup-0.5.12.exe "Link from GitHub Releases") |
| ***[Files]*** Full Rainbow *(All Languages)*  | [Full Rainbow for Grim Dawn v1.2.1.3 - All Languages](https://github.com/WareBare/WanezGD_Tools/releases/download/v0.5.12/fullRainbow-1.2.1.3_allLanguages.zip) |
| ***[Files]*** Full Rainbow *(English)*        | [Full Rainbow for Grim Dawn v1.2.1.3](https://github.com/WareBare/WanezGD_Tools/releases/download/v0.5.12/fullRainbow-1.2.1.3.zip) |
| ***[Files]*** Diablo & PoE *(English)*        | [Diablo for Grim Dawn v1.2.1.3](https://github.com/WareBare/WanezGD_Tools/releases/download/v0.5.12/diablo-1.2.1.3.zip) |
| ***[Files]*** Basic Highlighting *(English)*  | [Basic Highlighting for Grim Dawn v1.2.1.3](https://github.com/WareBare/WanezGD_Tools/releases/download/v0.5.12/basicHighlighting-1.2.1.3.zip) |

*___Note:___  If you are using the Files, check out a separate [GitHub - Repository](https://github.com/WareBare/WanezRainbowFiles) as it may have more up to date Full Rainbow files for all Languages, check there after a HotFix to Grim Dawn.*

*___Note:___ The tool has an Auto-Updater which will download and install the most recent Setup.exe version for you.*

*__Note:__ Downloads are being hosted on GitHub, if you wish to start the download from there, you may go to the `GitHub - Releases` page. You can find the link below in Useful Links.*



## Useful Links

| Description                                    | Link                                                         |
| ---------------------------------------------- | ------------------------------------------------------------ |
| ***[Source]*** The Tool To Generate Files      | [GitHub - Repository](https://github.com/WareBare/WanezGD_Tools) |
| ***[Source]*** Rainbow Files (Version Control) | [GitHub - Repository](https://github.com/WareBare/WanezRainbowFiles) |
| ***[Downloads]*** Downloads and Change Log     | [GitHub - Releases](https://github.com/WareBare/WanezGD_Tools/releases) |



## Useful Links for Custom Game Mode (aka Mods)

| Description                      | Link                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| ***[Mod]*** Grimarillion         | [Post with files and instructions](https://forums.crateentertainment.com/t/rel-grimarillion-v68/46587/1433) |
| ***[Mod]*** Dawn of Masteries    | [Post with files and instructions](https://forums.crateentertainment.com/t/dawn-of-masteries/94373/118) |
| ***[Mod]*** Reign of Terror | [Post with files and instructions](https://forums.crateentertainment.com/t/mod-reign-of-terror/35347/6730)                                                             |

*___Note:___ If a mod has files for Rainbow Filter and is not in the list, let me know about it.*



## Useful Links for other Languages

| Language   | Link                                                         | Link                                                         |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| German     | [GD Forum - Tool Information](https://forums.crateentertainment.com/t/german-translation/28374/1649) | [TQ Forum - Tool Information and Discussion](https://titanquest.4fansites.de/forum/viewtopic.php?f=31&t=12187&start=75#p236391) |
| Japanese   | [GD Forum - with File downloads](https://forums.crateentertainment.com/t/japanese-translation/28795) | [Jp-Wiki](http://wikiwiki.jp/gdcrate/?Mod%2FItem%20Filter)   |
| Vietnamese | [GD Forum](https://forums.crateentertainment.com/t/vietnamese-translation/97217) |                                                              |

*___Note:___ If your language has a useful link and it is not in the list, let me know about it.*


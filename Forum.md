*Change colors for Affixes, Item names and MI to quickly see a difference. Rare Affixes will be colored as such, without changing the color of the Item's name itself and MI will appear different from their rarity's default color. You may also see Properties such as Damage Types with different colors, this allows you to decide at a glance if an item is good for your build.*

---
# Table of Contents
1. [Introduction](#section-intro)
1. [Installation](#section-setup)
1. [Current Features](#section-features)
1. [Pictures](#section-img)
1. [Tool To Set Your Own Colors](#section-tool)
1. [Color Presets](#section-presets)

---
<a name="section-intro"></a>
# Introduction

This is not an actual mod neither is it going to change the game in any way, the files can be deleted at any time and nothing else is going to change when that happens. Which makes this a non-destructive way of changing the way items are shown in the game (playing with a mod or without).

*If you are using a different language (using files from translators) you may have to get them from your Community Translation Topic or use the tool mentioned below.*

---
<a name="section-setup"></a>

# Installation

You may download the most recent version over at [Matougi's post](https://forums.crateentertainment.com/t/wip-item-filter-via-colorcoding/42765/222 "Takes you to post with all of Matougi's uploads and change log") or use the tool myself and others are using [from the section below](#section-tool "Takes you to section: Tool To Set Your Own Colors") to use a [Color Preset](#section-presets "Takes you to section: Color Presets") or make adjustments to your own liking.

Extract the contents into you Grim Dawn directory, if done right, you will end up with a settings folder in your Grim Dawn directory. Inside that settings folder is a text_en folder and inside that are six *.txt files, responsible for changing the color of tags for the Main Campaign as well as for Custom Games.

<details>
    <summary>The files + path you should now have:</summary>
    <pre>
    Grim Dawn/settings/text_en/tags_items.txt
    Grim Dawn/settings/text_en/tags_ui.txt
    Grim Dawn/settings/text_en/tagsgdx1_items.txt
    Grim Dawn/settings/text_en/tagsgdx1_storyelements.txt
    Grim Dawn/settings/text_en/tagsgdx2_endlessdungeon.txt
    Grim Dawn/settings/text_en/tagsgdx2_items.txt
    </pre>
</details>
<font color="#EF5050"><em>Please note: Using an outdated version can cause issues in form of "Tag not found: ...", if this is the case make sure you are using the most recent version. When the error persists either remove the mod and check if the issue was resolved or report it here first, so that I can verify the bug is not related to this mod. No need to send Crate on a wild-goose chase.</em></font>

---
<a name="section-features"></a>
# Current Features

* Prefix and Suffix have the color of their rarity, no matter the item they are on.
* The Item's Name
  * is in the color of the base item's rarity
  * MI are in different color than an item of the same rarity (rares are green, rare MI are olive)
* Item Style/Quality are a different color (this includes Empowered and Mythical)
* Damage Types in tooltips
  * In a color for their Damage Type
  * If you do not want this one, you can just delete `Grim Dawn/settings/text_en/tags_ui.txt`

---
<a name="section-img"></a>

# Pictures

[details="1"]
![001|195x499](upload://WkCpn2KvDZUyM5KuGW8DTndbAQ.jpeg)
[/details]
[details="2"]
![002|471x373](upload://rofqaVADbnm2RPQIbaeFZxi4yp6.jpeg)
[/details]
[details="3"]
![003|405x432](upload://3fLLRra2K5hiiskNbTa5pHhvJHa.jpeg)
[/details]

---
<a name="section-tool"></a>
# Tool To Set Your Own Colors

You may create your own color settings with the help of the tool I use myself and many others (also works for different languages):

* Information: https://github.com/WareBare/WanezGD_Tools
* Downloads: https://github.com/WareBare/WanezGD_Tools/releases

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
<details><summary><kbd>Basic Highlighting</kbd></summary>
    <details><summary><kbd>Example Picture</kbd></summary>
        ![BasicHighlighting_Example|376x464](upload://zpQ7KVlAEr6Qhc5PS0Jv3OZbXt5.jpeg)
    </details>
    <ul>
        <li>Item Names<ul>
            <li>MI have the same color as items of the same rarity.</li>
            <li>Style Tags for Common, Magical and Rare items have a different color (Empowered and Mythical is the vanilla color).</li>
            <li>Epics and Legendaries are not using a specified color (therefore the (S) won't be there for Set items).</li>
        </ul></li>
        <li>Tooltip<ul>
            <li>Damage Type Colors are in three groups (Elemental, Physical/Pierce, Other).</li>
            <li>Damage over Time has a different color than the Direct Damage Types (but using the same grouping, with bleeding into the Physical/Pierce group).</li>
        </ul></li>
    </ul>
</details>
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


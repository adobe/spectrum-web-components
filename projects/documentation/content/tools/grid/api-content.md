---
layout: partial.njk
title: 'Grid: Spectrum Web Components'
displayName: Grid
componentName: grid
componentHeading: sp-grid
partType: api
tags:
- grid
---

### Attributes and Properties

<div class="table-container">
<table class="spectrum-Table spectrum-Table--sizeM">
<thead class="spectrum-Table-head">
<tr>

<th class="spectrum-Table-headCell">
Property
</th>

<th class="spectrum-Table-headCell">
Attribute
</th>

<th class="spectrum-Table-headCell">
Type
</th>

<th class="spectrum-Table-headCell">
Default
</th>

<th class="spectrum-Table-headCell">
Description
</th>

</tr>
</thead>
<tbody class="spectrum-Table-body">

<tr class="spectrum-Table-row" id="attributes and properties_focusableSelector" data-name="Property" data-value="focusableSelector">

<td class="spectrum-Table-cell">
<code>focusableSelector</code>
</td>

<td class="spectrum-Table-cell">
<code>focusableSelector</code>
</td>

<td class="spectrum-Table-cell">
<code>string</code>
</td>

<td class="spectrum-Table-cell">
<code></code>
</td>

<td class="spectrum-Table-cell">

</td>

</tr>

<tr class="spectrum-Table-row" id="attributes and properties_gap" data-name="Property" data-value="gap">

<td class="spectrum-Table-cell">
<code>gap</code>
</td>

<td class="spectrum-Table-cell">
<code>gap</code>
</td>

<td class="spectrum-Table-cell">
<code>`${'0' | `${number}px`}`</code>
</td>

<td class="spectrum-Table-cell">
<code>'0'</code>
</td>

<td class="spectrum-Table-cell">

</td>

</tr>

<tr class="spectrum-Table-row" id="attributes and properties_itemSize" data-name="Property" data-value="itemSize">

<td class="spectrum-Table-cell">
<code>itemSize</code>
</td>

<td class="spectrum-Table-cell">
<code>itemSize</code>
</td>

<td class="spectrum-Table-cell">
<code>{
        width: number;
        height: number;
    }</code>
</td>

<td class="spectrum-Table-cell">
<code>{
        width: 200,
        height: 200,
    }</code>
</td>

<td class="spectrum-Table-cell">

</td>

</tr>

<tr class="spectrum-Table-row" id="attributes and properties_items" data-name="Property" data-value="items">

<td class="spectrum-Table-cell">
<code>items</code>
</td>

<td class="spectrum-Table-cell">
<code>items</code>
</td>

<td class="spectrum-Table-cell">
<code>Record&lt;string, unknown&gt;[]</code>
</td>

<td class="spectrum-Table-cell">
<code>[]</code>
</td>

<td class="spectrum-Table-cell">

</td>

</tr>

<tr class="spectrum-Table-row" id="attributes and properties_padding" data-name="Property" data-value="padding">

<td class="spectrum-Table-cell">
<code>padding</code>
</td>

<td class="spectrum-Table-cell">
<code>padding</code>
</td>

<td class="spectrum-Table-cell">
<code>`${'0' | `${number}px`}` | undefined</code>
</td>

<td class="spectrum-Table-cell">
<code></code>
</td>

<td class="spectrum-Table-cell">

</td>

</tr>

<tr class="spectrum-Table-row" id="attributes and properties_selected" data-name="Property" data-value="selected">

<td class="spectrum-Table-cell">
<code>selected</code>
</td>

<td class="spectrum-Table-cell">
<code>selected</code>
</td>

<td class="spectrum-Table-cell">
<code>Record&lt;string, unknown&gt;[]</code>
</td>

<td class="spectrum-Table-cell">
<code>[]</code>
</td>

<td class="spectrum-Table-cell">

</td>

</tr>

</tbody>
</table>
</div>
    


### Events

<div class="table-container">
<table class="spectrum-Table spectrum-Table--sizeM">
<thead class="spectrum-Table-head">
<tr>

<th class="spectrum-Table-headCell">
Name
</th>

<th class="spectrum-Table-headCell">
Type
</th>

<th class="spectrum-Table-headCell">
Description
</th>

</tr>
</thead>
<tbody class="spectrum-Table-body">

<tr class="spectrum-Table-row" id="events_change" data-name="Event name" data-value="change">

<td class="spectrum-Table-cell">
<code>change</code>
</td>

<td class="spectrum-Table-cell">
<code>Event</code>
</td>

<td class="spectrum-Table-cell">
<code>Announces that the value of `selected` has changed</code>
</td>

</tr>

</tbody>
</table>
</div>
    

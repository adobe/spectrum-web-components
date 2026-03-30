/**
 * Copyright 2026 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import { CSSResultArray, html, nothing, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { Chevron100Icon } from '@adobe/spectrum-wc/icon';
import { SpectrumElement } from '@spectrum-web-components/core/element';

import '@adobe/spectrum-wc/icon';

import styles from './date-picker.css';

const CalendarIcon = html`
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    style="width:20px;height:20px"
  >
    <path
      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z"
    />
  </svg>
`;

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

/**
 * A date picker component with an input field and calendar dropdown.
 * Supports single date selection and date range highlighting.
 *
 * @element swc-date-picker
 *
 * @example
 * <swc-date-picker label="Start date" value="2025-02-02"></swc-date-picker>
 *
 * @example
 * <swc-date-picker
 *   label="Date range"
 *   value="2025-02-02"
 *   range-end="2025-02-08"
 *   open
 * ></swc-date-picker>
 */
export class DatePicker extends SpectrumElement {
  @property({ type: String })
  public label: string = 'Label';

  @property({ type: String, reflect: true })
  public value: string = '';

  @property({ type: String, attribute: 'range-end' })
  public rangeEnd: string = '';

  @property({ type: Boolean, reflect: true })
  public open: boolean = false;

  @property({ type: String })
  public min: string = '';

  @property({ type: String })
  public max: string = '';

  @state()
  private _displayYear: number = new Date().getFullYear();

  @state()
  private _displayMonth: number = new Date().getMonth();

  public static override get styles(): CSSResultArray {
    return [styles];
  }

  public override connectedCallback(): void {
    super.connectedCallback();
    this._syncDisplayMonth();
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
    document.addEventListener('click', this._handleOutsideClick);
  }

  public override disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this._handleOutsideClick);
  }

  private _syncDisplayMonth(): void {
    if (this.value) {
      const d = this._parseDate(this.value);
      if (d) {
        this._displayYear = d.getFullYear();
        this._displayMonth = d.getMonth();
      }
    }
  }

  private _handleOutsideClick(e: Event): void {
    if (!this.open) {
      return;
    }
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.open = false;
    }
  }

  private _toggleOpen(e: Event): void {
    e.stopPropagation();
    this.open = !this.open;
  }

  private _prevMonth(): void {
    if (this._displayMonth === 0) {
      this._displayMonth = 11;
      this._displayYear -= 1;
    } else {
      this._displayMonth -= 1;
    }
  }

  private _nextMonth(): void {
    if (this._displayMonth === 11) {
      this._displayMonth = 0;
      this._displayYear += 1;
    } else {
      this._displayMonth += 1;
    }
  }

  private _selectDay(day: number): void {
    const month = String(this._displayMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    this.value = `${this._displayYear}-${month}-${dayStr}`;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      })
    );
  }

  private _parseDate(iso: string): Date | null {
    if (!iso) {
      return null;
    }
    const parts = iso.split('-');
    if (parts.length !== 3) {
      return null;
    }
    const d = new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[2], 10)
    );
    return isNaN(d.getTime()) ? null : d;
  }

  private _formatDisplay(iso: string): string {
    const d = this._parseDate(iso);
    if (!d) {
      return '';
    }
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm} / ${dd} / ${yyyy}`;
  }

  private _daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

  private _firstDayOfWeek(year: number, month: number): number {
    return new Date(year, month, 1).getDay();
  }

  private _isSameDay(d1: Date | null, d2: Date | null): boolean {
    if (!d1 || !d2) {
      return false;
    }
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  private _isToday(year: number, month: number, day: number): boolean {
    const now = new Date();
    return (
      now.getFullYear() === year &&
      now.getMonth() === month &&
      now.getDate() === day
    );
  }

  private _isInRange(date: Date): boolean {
    const start = this._parseDate(this.value);
    const end = this._parseDate(this.rangeEnd);
    if (!start || !end) {
      return false;
    }
    const t = date.getTime();
    const s = start.getTime();
    const e = end.getTime();
    const lo = Math.min(s, e);
    const hi = Math.max(s, e);
    return t >= lo && t <= hi;
  }

  private _isDayDisabled(year: number, month: number, day: number): boolean {
    const date = new Date(year, month, day);
    if (this.min) {
      const minDate = this._parseDate(this.min);
      if (minDate && date.getTime() < minDate.getTime()) {
        return true;
      }
    }
    if (this.max) {
      const maxDate = this._parseDate(this.max);
      if (maxDate && date.getTime() > maxDate.getTime()) {
        return true;
      }
    }
    return false;
  }

  private _renderCalendar(): TemplateResult {
    const year = this._displayYear;
    const month = this._displayMonth;
    const daysInMonth = this._daysInMonth(year, month);
    const firstDay = this._firstDayOfWeek(year, month);
    const selectedDate = this._parseDate(this.value);
    const rangeEndDate = this._parseDate(this.rangeEnd);

    const monthName = new Date(year, month).toLocaleString('default', {
      month: 'long',
    });

    const cells: TemplateResult[] = [];

    // Empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
      cells.push(html`
        <div class="swc-DatePicker-day swc-DatePicker-day--empty"></div>
      `);
    }

    // Day cells
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isSelected =
        this._isSameDay(date, selectedDate) ||
        this._isSameDay(date, rangeEndDate);
      const isRangeStart =
        this._isSameDay(date, selectedDate) && !!rangeEndDate;
      const isRangeEnd = this._isSameDay(date, rangeEndDate);
      const isInRange = this._isInRange(date) && !isSelected;
      const isToday = this._isToday(year, month, day);
      const isDisabled = this._isDayDisabled(year, month, day);

      const classes = {
        'swc-DatePicker-day': true,
        'swc-DatePicker-day--selected': isSelected,
        'swc-DatePicker-day--rangeStart': isRangeStart && !isRangeEnd,
        'swc-DatePicker-day--rangeEnd': isRangeEnd && !isRangeStart,
        'swc-DatePicker-day--inRange': isInRange,
        'swc-DatePicker-day--today': isToday,
        'swc-DatePicker-day--disabled': isDisabled,
      };

      cells.push(html`
        <button
          class=${classMap(classes)}
          @click=${() => !isDisabled && this._selectDay(day)}
          aria-label="${monthName} ${day}, ${year}"
          ?disabled=${isDisabled}
        >
          ${day}
        </button>
      `);
    }

    return html`
      <div class="swc-DatePicker-dropdown">
        <div class="swc-DatePicker-header">
          <button
            class="swc-DatePicker-navBtn"
            @click=${this._prevMonth}
            aria-label="Previous month"
          >
            <swc-icon style="transform: rotate(90deg)">
              ${Chevron100Icon()}
            </swc-icon>
          </button>
          <span class="swc-DatePicker-headerTitle">${monthName} ${year}</span>
          <button
            class="swc-DatePicker-navBtn"
            @click=${this._nextMonth}
            aria-label="Next month"
          >
            <swc-icon style="transform: rotate(-90deg)">
              ${Chevron100Icon()}
            </swc-icon>
          </button>
        </div>
        <div class="swc-DatePicker-dayLabels">
          ${DAY_LABELS.map(
            (d) => html`
              <span class="swc-DatePicker-dayLabel">${d}</span>
            `
          )}
        </div>
        <div class="swc-DatePicker-grid">${cells}</div>
      </div>
    `;
  }

  protected override render(): TemplateResult {
    const displayText = this.rangeEnd
      ? `${this._formatDisplay(this.value)} - ${this._formatDisplay(this.rangeEnd)}`
      : this._formatDisplay(this.value) || 'Select a date';

    return html`
      ${this.label
        ? html`
            <label class="swc-DatePicker-label">${this.label}</label>
          `
        : nothing}
      <div class="swc-DatePicker-field" @click=${this._toggleOpen}>
        <span class="swc-DatePicker-fieldText">${displayText}</span>
        <span class="swc-DatePicker-fieldIcon">${CalendarIcon}</span>
      </div>
      ${this.open ? this._renderCalendar() : nothing}
    `;
  }
}

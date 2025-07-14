"use strict";
import {
  html
} from "@spectrum-web-components/base";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-abc.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-aemscreens.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-actions.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-display-advert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-print-advert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add-to.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add-to-selection.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-airplane.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert-circle-filled.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-algorithm.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alias.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-bottom.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-middle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-top.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-amusementpark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-anchor.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-anchor-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-annotate.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-annotate-pen.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-answer.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-answer-favorite.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-app.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-app-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-apple-files.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-application-delivery.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-approve-reject.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-apps.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-archive.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-archive-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-arrow-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-arrow-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-arrow-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-arrow-up.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-arrow-up-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-artboard.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-article.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-asset.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-asset-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-assets-added.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-assets-downloaded.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-assets-expired.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-assets-linked-published.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-assets-modified.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-assets-published.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-asterisk.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-at.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-attach.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-attachment-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-attributes.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-audio.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-automated-segment.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-back.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-back30-seconds.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-back-android.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-beaker.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-beaker-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-beaker-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bell.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bid-rule.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bid-rule-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-blower.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-blur.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-book.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark-single.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark-single-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark-small.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark-small-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-boolean.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-border.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-box.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-box-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-box-export.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-box-import.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-brackets.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-brackets-square.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-branch1.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-branch2.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-branch3.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-branch-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-breadcrumb-navigation.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-breakdown.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-breakdown-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-briefcase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-browse.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-brush.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bug.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-building.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bulk-edit-users.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cclibrary.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calculator.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar-locked.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar-unlocked.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-call-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-camera.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-camera-flip.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-camera-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-campaign.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-campaign-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-campaign-close.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-campaign-delete.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-campaign-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cancel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-capitals.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-captcha.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-car.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-card.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-channel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chat.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chat-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-check-pause.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-double-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-double-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-up.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-up-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-circle-filled.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-classic-grid-view.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-clock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-clock-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-clone-stamp.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close-captions.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-disconnected.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-error.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-code.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-collection.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-collection-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-collection-add-to.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-collection-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-collection-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-collection-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-collection-link.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-color-fill.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-color-palette.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-color-wheel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-column-settings.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-column-two-a.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-column-two-b.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-column-two-c.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-comment.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-compare.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-compass.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-condition.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-confidence-four.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-confidence-one.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-confidence-three.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-confidence-two.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-contrast.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-conversion-funnel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cover-image.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-credit-card.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-crop.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-crop-lightning.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-crop-rotate.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-crosshairs.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-curate.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cut.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-dashboard.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-book.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-correlated.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-download.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-mapping.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-settings.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-unavailable.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-upload.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-user.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-date.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-date-input.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-deduplication.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-delegate.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-delete-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-demographic.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-deselect.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-deselect-circular.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-desktop-and-mobile.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-desktop.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-laptop.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-phone.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-phone-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-preview.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-rotate-landscape.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-rotate-portrait.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-t-v.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-tablet.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-devices.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-discover.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-discover-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-bottom-edge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-horizontal-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-horizontally.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-left-edge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-right-edge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-space-horiz.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-space-vert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-top-edge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-vertical-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-vertically.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-divide.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-divide-path.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-document.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-document-fragment.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-document-fragment-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-document-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-document-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-dolly.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-download.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-download-from-cloud.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-download-from-cloud-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-draft.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-drag-handle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-draw.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-dropdown.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-duplicate.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit-in.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit-in-light.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-education.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-effects.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-efficient.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-ellipse.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-cancel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-exclude-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-gear.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-gear-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-key.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-key-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-lightning.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-notification.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email-schedule.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-engagement.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-enterprise.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-erase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-event.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-event-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-event-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-events.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-exclude-overlap.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-experience.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-experience-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-experience-add-to.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-experience-export.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-experience-import.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-export.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-export-original.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-exposure.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-extension.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-facebook-cover-image.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-fast.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-fast-forward.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-fast-forward-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-feature.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-feed.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-feed-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-feed-management.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-feedback.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-cs-v.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-campaign.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-chart.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-checked-out.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-code.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-data.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-email.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-excel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-folder.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-gear.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-globe.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-htm-l.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-important.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-json.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-key.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-mobile.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-pd-f.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-single-web-page.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-space.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-template.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-txt.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-user.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-word.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-workflow.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-xm-l.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-zip.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filing-cabinet.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filmroll.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filmroll-auto-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter-delete.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter-heart.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter-star.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-find-and-replace.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flag.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flag-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flash-auto.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flash-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flash-on.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flashlight.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flashlight-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flashlight-on.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flip-horizontal.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flip-vertical.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder2-color.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-add-to.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-archive.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-delete.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-gear.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-locked.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-search.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-user.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-follow.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-follow-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-for-placement-only.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-forecast.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-form.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-forward.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-full-screen.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-full-screen-exit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-function.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-game.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gauge1.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gauge2.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gauge3.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gauge4.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gauge5.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gears.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gears-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gears-delete.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gears-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gender-female.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gender-male.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gift.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-clock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-enter.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-exit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-grid.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-search.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-strike.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-strike-clock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-government.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gradient.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-area.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-area-stacked.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bar-horizontal.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bar-horizontal-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bar-horizontal-stacked.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bar-vertical.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bar-vertical-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bar-vertical-stacked.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bubble.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-bullet.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-confidence-bands.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-donut.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-donut-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-gantt.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-histogram.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-pathing.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-pie.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-profit-curve.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-scatter.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-stream.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-stream-ranked.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-stream-ranked-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-sunburst.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-tree.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-trend.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-trend-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graph-trend-alert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-graphic.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hammer.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hand.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hand0.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hand1.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hand2.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hand3.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hand4.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-heal.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-heart.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-histogram.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-history.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-home.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-homepage.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hot-fixes.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hotel-bed.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-identity-service.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-album.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-auto-mode.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-carousel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-checked-out.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-map-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-map-polygon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-map-rectangle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-next.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-profile.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-search.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-text.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-images.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-import.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-inbox.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-individual.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-info.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-info-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-intersect-overlap.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-invert-adj.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-invite.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-journey.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-journey-action.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-journey-data.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-journey-event.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-journey-event2.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-journey-reports.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-journey-voyager.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-jump-to-top.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-key.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-key-clock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-key-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-keyboard.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-label.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-label-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-labels.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-landscape.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-launch.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-layers.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-layers-backward.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-layers-bring-to-front.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-layers-forward.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-layers-send-to-back.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-learn.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-light.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-line.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-line-height.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-linear-gradient.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-globe.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-nav.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-out.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-out-light.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-page.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-user.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-location.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-location-based-date.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-location-based-event.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-location-contribution.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-lock-closed.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-lock-open.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-log-out.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-login.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-looks.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-loupe-view.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-mbox.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-magic-wand.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-magnify.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-mailbox.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-map-view.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-margin-bottom.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-margin-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-margin-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-margin-top.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-marketing-activities.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-maximize.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-measure.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-menu.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-merge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-merge-layers.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-messenger.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-minimize.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-mobile-services.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-modern-grid-view.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-money.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-monitoring.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-moon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more-small.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more-small-list.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more-small-list-vert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more-vertical.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-move.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-move-left-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-move-to.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-move-up-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-movie-camera.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-multiple.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-multiple-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-multiple-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-multiple-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-naming-order.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-new-item.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-news.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-news-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-no-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-note.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-note-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-os.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-offer.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-offer-activities.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-offer-delete.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-offers.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-on-air.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-open-in.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-open-in-light.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-open-recent.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-open-recent-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-orbit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-organisations.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-organize.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-outline-path.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-padding-bottom.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-padding-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-padding-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-padding-top.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-page-break.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-page-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-page-gear.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-page-rule.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-page-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-page-tag.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pages-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pan.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-panel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-paste.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-paste-htm-l.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-paste-list.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-paste-text.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pattern.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pause.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pause-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pawn.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pending.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-people-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-personalization-field.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-perspective.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pin-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pin-on.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pivot.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-placeholder.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-platform-data-mapping.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-play.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-play-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-plug.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-polygon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-polygon-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pop-in.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-portrait.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-preset.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-preview.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-print.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-print-preview.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-project.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-project-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-project-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-project-name-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-promote.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-properties.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-properties-copy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-publish-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-publish-pending.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-publish-reject.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-publish-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-publish-schedule.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-push-notification.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-question.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-quick-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rss.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-radial-gradient.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rail.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rail-bottom.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rail-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rail-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rail-right-close.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rail-right-open.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rail-top.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-range-mask.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-real-time-customer-profile.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rect-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rectangle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-redo.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-region-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-relevance.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-remove-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rename.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-reorder.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-replay.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-replies.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-reply.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-reply-all.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-report.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-report-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-resize.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-resolved-comment.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-retweet.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-reuse.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-revenue.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-revert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rewind.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rewind-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-ribbon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-cc-w.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-ccw-bold.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-c-w.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-cw-bold.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-left-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-right-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sms.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-smskey.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-smslightning.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-smsrefresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sqlquery.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sampler.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sandbox.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-save-as-floppy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-save-floppy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-save-to.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-save-to-light.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-scribble.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-search.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-seat.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-seat-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-segmentation.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-segments.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-box.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-box-all.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-circular.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-container.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-gear.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-intersect.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-subtract.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-selection.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-selection-checked.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-selection-move.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-send.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sentiment-negative.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sentiment-neutral.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sentiment-positive.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-separator.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-servers.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-shapes.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-share-android.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-share-check.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-share-light.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-share-windows.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sharpen.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-shield.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-ship.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-shop.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-shopping-cart.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-show-all-layers.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-show-menu.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-show-one-layer.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-shuffle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-slice.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-slow.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-small-caps.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-snapshot.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-social-network.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sort-order-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sort-order-up.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-spam.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-spellcheck.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-spin.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-split-view.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-spot-heal.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stadium.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stage.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stamp.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-star.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-star-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-starburst.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-step-backward.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-step-backward-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-step-forward.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-step-forward-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stop.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stop-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stopwatch.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-straighten.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-straighten-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stroke-width.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-subscribe.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-subtract-back-path.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-subtract-from-selection.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-subtract-front-path.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-success-metric.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-summarize.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-survey.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-switch.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sync.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sync-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-and-chart.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-column-add-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-column-add-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-column-merge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-column-remove-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-column-split.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-histogram.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-merge-cells.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-row-add-bottom.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-row-add-top.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-row-merge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-row-remove-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-row-split.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-select-column.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table-select-row.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tag-bold.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tag-italic.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tag-underline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-target.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-targeted.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-task-list.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-teapot.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-temperature.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-test-a-b.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-test-ab-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-test-ab-gear.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-test-ab-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-test-profile.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-justify.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-baseline-shift.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-bold.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-bulleted.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-bulleted-attach.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-bulleted-hierarchy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-bulleted-hierarchy-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-color.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-decrease.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-increase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-indent-decrease.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-indent-increase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-italic.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-kerning.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-lettered-lower-case.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-lettered-upper-case.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-numbered.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-paragraph.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-roman-lowercase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-roman-uppercase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-size.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-size-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-space-after.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-space-before.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-strikethrough.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-stroke.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-style.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-subscript.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-superscript.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-tracking.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-underline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-thumb-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-thumb-down-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-thumb-up.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-thumb-up-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tips.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-train.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-transfer-to-platform.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-transparency.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-trap.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tree-collapse.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tree-collapse-all.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tree-expand.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tree-expand-all.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tree-view.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-trend-inspect.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-trim-path.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-trophy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-type.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-usa.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-underline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-undo.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-ungroup.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-unlink.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-unmerge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-unresolved-comment.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-upload-to-cloud.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-upload-to-cloud-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-activity.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-admin.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-arrow.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-checked-out.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-developer.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-lock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-users-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-users-exclude.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-users-lock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-users-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-variable.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-vector-draw.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-vertical-masonry-grid-view.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-video-checked-out.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-video-filled.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-video-outline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-all-tags.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-bi-week.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-card.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-card-one-col.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-column.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-day.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-detail.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-grid.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-list.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-row.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-single.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-stack.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-table.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-week.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-viewed-mark-as.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-vignette.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-visibility.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-visibility-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-visit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-visit-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-voice-over.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-volume-mute.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-volume-one.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-volume-three.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-volume-two.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-watch.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-web-page.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-web-pages.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-workflow.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-workflow-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-wrench.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-in.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-out.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-abc.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-accessibility.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add-content.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert-diamond.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-alert-triangle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-bottom.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-middle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-align-top.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-animation-no.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-animation.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-app.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-apps-all.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-apps.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-archive.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-arrow-head-tool.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-artboard.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-aspect-ratio.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-asset.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-attach.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-audio-wave.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-auto-select-subject.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-background.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-badge-verified.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bell-rotated.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bell.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-beta-app.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-binoculars.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-blur.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bookmark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-brand.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-briefcase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-brightness-contrast.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-brush.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-bug.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-building.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-buildings.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cclibrary.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar-day.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar-week.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-calendar.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-call-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-camera-properties.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-camera.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cancel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-channel.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chart-bar-vert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chart-pie.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chart-trend.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chat.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-check-box.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-checkmark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-double-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-double-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-chevron-up.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-clock-pending.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-clock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close-captions.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-close.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-default.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-disconnected.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-error-red.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-error.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-in-progress.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-online.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-paused.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-pending.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud-state-slow-connection.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cloud.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-code.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-collection.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-color-fill.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-color-harmony.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-color.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-comment-checkmark.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-comment-hide.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-comment-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-comment-show.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-comment-text.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-comment.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-community.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-compare.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-contextual-task-bar.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-contrast.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-copy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-corner-radius-bottom-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-corner-radius-bottom-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-corner-radius-each.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-corner-radius-top-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-corner-radius-top-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-corner-radius.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-crop-rotate.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-crop.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cursor-click.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-cut.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-settings.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data-upload.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-data.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-delete.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-all.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-desktop-mobile.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-desktop.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-laptop.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-mobile.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-multiscreen.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-phone.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-device-tablet.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-direct-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-discover.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-bottom-edge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-horizontal-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-left-edge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-right-edge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-space-horizontally.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-space-vertically.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-top-edge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-distribute-vertical-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-download.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-draw.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-duplicate.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit-no.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-education.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-effect-border.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-effects.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-email.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-emoji.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-enterprise.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-erase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-export-to.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-export.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-exposure.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-eyedropper.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-feedback.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-convert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-text.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file-user.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-file.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-files.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filmstrip.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filter.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-filters.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-find-and-replace.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flag.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flip-horizontal.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-flip-vertical.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-breadcrumb.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-clock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-move-to.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-open.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder-search.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-folder.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-font-picker.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-full-screen-exit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-full-screen.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gift.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-globe-grid.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gradient-horizontal.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gradient-radial.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-gradient.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-grid-type-dots.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-grid-type-lines.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-grids-and-rulers.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-group-no.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-hand.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-heart.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-help-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-history.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-home.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image-background-remove.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-image.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-images.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-import.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-info-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-interaction.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-invert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-invite.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-key.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-keyboard.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-lasso-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-layers.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-layout.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-leave.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-lightbulb.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-lighten.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-line-height.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-line.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link-vertical.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-link.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-list-bulleted.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-list-multi-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-list-numbered.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-location.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-lock-open.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-lock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-logo.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-magic-wand.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-market.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-mask-disable.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-mask.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-maximize.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-media-offline-n.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-mention.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-menu-hamburger.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-microphone-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-microphone.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-minimize.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-more.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-move.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-movie-camera.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-music-note.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-naming-order.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-new.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-nudge.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-open-in.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-order-bottom.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-order-one-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-order-one-up.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-order-top.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-order.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-orientation-landscape.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-orientation-portrait.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-paste.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-path.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pattern.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pause-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pause.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pen-brush.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-people-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-people.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-percentage.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pin-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-pin-on.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-play.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-plugin-gear.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-plugin.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-polygon3.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-polygon4.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-polygon5.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-polygon6.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-preview.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-print.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-project-add-into.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-project-create.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-project.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-promote.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-prompt.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-properties.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-prototyping.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-publish-no.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-publish.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-radio-button.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rectangle-horiz.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-redo.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-refresh.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-remove-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rename.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-replace.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-report-abuse.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-resize.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-revert.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-review-link.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-ribbon.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rocket-quick-actions.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-cc-w.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-c-w.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-rotate-orientation.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-ruler.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-saturation.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-save-floppy.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-search.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-all-items.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-and-move.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-multi.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-no.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-none.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select-rectangle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-select.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-send.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-settings.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-shapes.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-share-android.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-share.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-shopping-cart.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-shuffle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-similar.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-slideshow.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-slow-connection-circle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-social-network.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sort-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sort-up.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sort.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-speed-fast.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stamp-clone.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-star-filled.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-star.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-step-backward.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-step-forward.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-sticky-note.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stroke-dotted.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stroke-solid.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-stroke-width.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-switch-vertical.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-switch.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-table.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tag.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-target.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-temperature.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-template.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-justify-last-center.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-justify-last-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-justify-last-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-justify.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-left.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-align-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-bold.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-caps-all.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-caps-small.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-highlight.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-increase.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-italic.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-numbers.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-paragraph.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-replace-comment.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-size.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-strikethrough.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-subscript.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-superscript.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-underline.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text-variable-font-settings.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-text.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-thumb-down.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-thumb-up.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-toggle.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tools.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-touch-one-finger-swipe-left-right.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-transcript.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-transform-distort.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-transform-generic.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-transform-perspective.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-transform-skew.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-transform-warp.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-translate.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-tutorials.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-unlink.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-undo.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-unlink-horiz.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-unlink-vertical.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-upload-to-cloud.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-upload.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-add.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-avatar-cursor.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-avatar.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-edit.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-following.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-group.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-lock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user-settings.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-user.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-users-lock.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-vector-draw.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-video.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-grid-fluid.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-grid.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-list.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-view-transparency.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-visibility-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-visibility.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-volume-off.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-volume-one.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-volume-two.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-web-nav-bar.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-web-page.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-in.js";
import "@spectrum-web-components/icons-workflow/icons/sp-icon-zoom-out.js";
export const iconManifest = [
  { name: "Abc", tag: "<sp-icon-abc>", story: (size) => html`<sp-icon-abc size=${size}></sp-icon-abc>` },
  { name: "Aemscreens", tag: "<sp-icon-aemscreens>", story: (size) => html`<sp-icon-aemscreens size=${size}></sp-icon-aemscreens>` },
  { name: "Actions", tag: "<sp-icon-actions>", story: (size) => html`<sp-icon-actions size=${size}></sp-icon-actions>` },
  { name: "Display advert", tag: "<sp-icon-display-advert>", story: (size) => html`<sp-icon-display-advert size=${size}></sp-icon-display-advert>` },
  { name: "Print advert", tag: "<sp-icon-print-advert>", story: (size) => html`<sp-icon-print-advert size=${size}></sp-icon-print-advert>` },
  { name: "Add", tag: "<sp-icon-add>", story: (size) => html`<sp-icon-add size=${size}></sp-icon-add>` },
  { name: "Add circle", tag: "<sp-icon-add-circle>", story: (size) => html`<sp-icon-add-circle size=${size}></sp-icon-add-circle>` },
  { name: "Add to", tag: "<sp-icon-add-to>", story: (size) => html`<sp-icon-add-to size=${size}></sp-icon-add-to>` },
  { name: "Add to selection", tag: "<sp-icon-add-to-selection>", story: (size) => html`<sp-icon-add-to-selection size=${size}></sp-icon-add-to-selection>` },
  { name: "Airplane", tag: "<sp-icon-airplane>", story: (size) => html`<sp-icon-airplane size=${size}></sp-icon-airplane>` },
  { name: "Alert", tag: "<sp-icon-alert>", story: (size) => html`<sp-icon-alert size=${size}></sp-icon-alert>` },
  { name: "Alert add", tag: "<sp-icon-alert-add>", story: (size) => html`<sp-icon-alert-add size=${size}></sp-icon-alert-add>` },
  { name: "Alert check", tag: "<sp-icon-alert-check>", story: (size) => html`<sp-icon-alert-check size=${size}></sp-icon-alert-check>` },
  { name: "Alert circle", tag: "<sp-icon-alert-circle>", story: (size) => html`<sp-icon-alert-circle size=${size}></sp-icon-alert-circle>` },
  { name: "Alert circle filled", tag: "<sp-icon-alert-circle-filled>", story: (size) => html`<sp-icon-alert-circle-filled size=${size}></sp-icon-alert-circle-filled>` },
  { name: "Algorithm", tag: "<sp-icon-algorithm>", story: (size) => html`<sp-icon-algorithm size=${size}></sp-icon-algorithm>` },
  { name: "Alias", tag: "<sp-icon-alias>", story: (size) => html`<sp-icon-alias size=${size}></sp-icon-alias>` },
  { name: "Align bottom", tag: "<sp-icon-align-bottom>", story: (size) => html`<sp-icon-align-bottom size=${size}></sp-icon-align-bottom>` },
  { name: "Align center", tag: "<sp-icon-align-center>", story: (size) => html`<sp-icon-align-center size=${size}></sp-icon-align-center>` },
  { name: "Align left", tag: "<sp-icon-align-left>", story: (size) => html`<sp-icon-align-left size=${size}></sp-icon-align-left>` },
  { name: "Align middle", tag: "<sp-icon-align-middle>", story: (size) => html`<sp-icon-align-middle size=${size}></sp-icon-align-middle>` },
  { name: "Align right", tag: "<sp-icon-align-right>", story: (size) => html`<sp-icon-align-right size=${size}></sp-icon-align-right>` },
  { name: "Align top", tag: "<sp-icon-align-top>", story: (size) => html`<sp-icon-align-top size=${size}></sp-icon-align-top>` },
  { name: "Amusementpark", tag: "<sp-icon-amusementpark>", story: (size) => html`<sp-icon-amusementpark size=${size}></sp-icon-amusementpark>` },
  { name: "Anchor", tag: "<sp-icon-anchor>", story: (size) => html`<sp-icon-anchor size=${size}></sp-icon-anchor>` },
  { name: "Anchor select", tag: "<sp-icon-anchor-select>", story: (size) => html`<sp-icon-anchor-select size=${size}></sp-icon-anchor-select>` },
  { name: "Annotate", tag: "<sp-icon-annotate>", story: (size) => html`<sp-icon-annotate size=${size}></sp-icon-annotate>` },
  { name: "Annotate pen", tag: "<sp-icon-annotate-pen>", story: (size) => html`<sp-icon-annotate-pen size=${size}></sp-icon-annotate-pen>` },
  { name: "Answer", tag: "<sp-icon-answer>", story: (size) => html`<sp-icon-answer size=${size}></sp-icon-answer>` },
  { name: "Answer favorite", tag: "<sp-icon-answer-favorite>", story: (size) => html`<sp-icon-answer-favorite size=${size}></sp-icon-answer-favorite>` },
  { name: "App", tag: "<sp-icon-app>", story: (size) => html`<sp-icon-app size=${size}></sp-icon-app>` },
  { name: "App refresh", tag: "<sp-icon-app-refresh>", story: (size) => html`<sp-icon-app-refresh size=${size}></sp-icon-app-refresh>` },
  { name: "Apple files", tag: "<sp-icon-apple-files>", story: (size) => html`<sp-icon-apple-files size=${size}></sp-icon-apple-files>` },
  { name: "Application delivery", tag: "<sp-icon-application-delivery>", story: (size) => html`<sp-icon-application-delivery size=${size}></sp-icon-application-delivery>` },
  { name: "Approve reject", tag: "<sp-icon-approve-reject>", story: (size) => html`<sp-icon-approve-reject size=${size}></sp-icon-approve-reject>` },
  { name: "Apps", tag: "<sp-icon-apps>", story: (size) => html`<sp-icon-apps size=${size}></sp-icon-apps>` },
  { name: "Archive", tag: "<sp-icon-archive>", story: (size) => html`<sp-icon-archive size=${size}></sp-icon-archive>` },
  { name: "Archive remove", tag: "<sp-icon-archive-remove>", story: (size) => html`<sp-icon-archive-remove size=${size}></sp-icon-archive-remove>` },
  { name: "Arrow down", tag: "<sp-icon-arrow-down>", story: (size) => html`<sp-icon-arrow-down size=${size}></sp-icon-arrow-down>` },
  { name: "Arrow left", tag: "<sp-icon-arrow-left>", story: (size) => html`<sp-icon-arrow-left size=${size}></sp-icon-arrow-left>` },
  { name: "Arrow right", tag: "<sp-icon-arrow-right>", story: (size) => html`<sp-icon-arrow-right size=${size}></sp-icon-arrow-right>` },
  { name: "Arrow up", tag: "<sp-icon-arrow-up>", story: (size) => html`<sp-icon-arrow-up size=${size}></sp-icon-arrow-up>` },
  { name: "Arrow up right", tag: "<sp-icon-arrow-up-right>", story: (size) => html`<sp-icon-arrow-up-right size=${size}></sp-icon-arrow-up-right>` },
  { name: "Artboard", tag: "<sp-icon-artboard>", story: (size) => html`<sp-icon-artboard size=${size}></sp-icon-artboard>` },
  { name: "Article", tag: "<sp-icon-article>", story: (size) => html`<sp-icon-article size=${size}></sp-icon-article>` },
  { name: "Asset", tag: "<sp-icon-asset>", story: (size) => html`<sp-icon-asset size=${size}></sp-icon-asset>` },
  { name: "Asset check", tag: "<sp-icon-asset-check>", story: (size) => html`<sp-icon-asset-check size=${size}></sp-icon-asset-check>` },
  { name: "Assets added", tag: "<sp-icon-assets-added>", story: (size) => html`<sp-icon-assets-added size=${size}></sp-icon-assets-added>` },
  { name: "Assets downloaded", tag: "<sp-icon-assets-downloaded>", story: (size) => html`<sp-icon-assets-downloaded size=${size}></sp-icon-assets-downloaded>` },
  { name: "Assets expired", tag: "<sp-icon-assets-expired>", story: (size) => html`<sp-icon-assets-expired size=${size}></sp-icon-assets-expired>` },
  { name: "Assets linked published", tag: "<sp-icon-assets-linked-published>", story: (size) => html`<sp-icon-assets-linked-published size=${size}></sp-icon-assets-linked-published>` },
  { name: "Assets modified", tag: "<sp-icon-assets-modified>", story: (size) => html`<sp-icon-assets-modified size=${size}></sp-icon-assets-modified>` },
  { name: "Assets published", tag: "<sp-icon-assets-published>", story: (size) => html`<sp-icon-assets-published size=${size}></sp-icon-assets-published>` },
  { name: "Asterisk", tag: "<sp-icon-asterisk>", story: (size) => html`<sp-icon-asterisk size=${size}></sp-icon-asterisk>` },
  { name: "At", tag: "<sp-icon-at>", story: (size) => html`<sp-icon-at size=${size}></sp-icon-at>` },
  { name: "Attach", tag: "<sp-icon-attach>", story: (size) => html`<sp-icon-attach size=${size}></sp-icon-attach>` },
  { name: "Attachment exclude", tag: "<sp-icon-attachment-exclude>", story: (size) => html`<sp-icon-attachment-exclude size=${size}></sp-icon-attachment-exclude>` },
  { name: "Attributes", tag: "<sp-icon-attributes>", story: (size) => html`<sp-icon-attributes size=${size}></sp-icon-attributes>` },
  { name: "Audio", tag: "<sp-icon-audio>", story: (size) => html`<sp-icon-audio size=${size}></sp-icon-audio>` },
  { name: "Automated segment", tag: "<sp-icon-automated-segment>", story: (size) => html`<sp-icon-automated-segment size=${size}></sp-icon-automated-segment>` },
  { name: "Back", tag: "<sp-icon-back>", story: (size) => html`<sp-icon-back size=${size}></sp-icon-back>` },
  { name: "Back30 seconds", tag: "<sp-icon-back30-seconds>", story: (size) => html`<sp-icon-back30-seconds size=${size}></sp-icon-back30-seconds>` },
  { name: "Back android", tag: "<sp-icon-back-android>", story: (size) => html`<sp-icon-back-android size=${size}></sp-icon-back-android>` },
  { name: "Beaker", tag: "<sp-icon-beaker>", story: (size) => html`<sp-icon-beaker size=${size}></sp-icon-beaker>` },
  { name: "Beaker check", tag: "<sp-icon-beaker-check>", story: (size) => html`<sp-icon-beaker-check size=${size}></sp-icon-beaker-check>` },
  { name: "Beaker share", tag: "<sp-icon-beaker-share>", story: (size) => html`<sp-icon-beaker-share size=${size}></sp-icon-beaker-share>` },
  { name: "Bell", tag: "<sp-icon-bell>", story: (size) => html`<sp-icon-bell size=${size}></sp-icon-bell>` },
  { name: "Bid rule", tag: "<sp-icon-bid-rule>", story: (size) => html`<sp-icon-bid-rule size=${size}></sp-icon-bid-rule>` },
  { name: "Bid rule add", tag: "<sp-icon-bid-rule-add>", story: (size) => html`<sp-icon-bid-rule-add size=${size}></sp-icon-bid-rule-add>` },
  { name: "Blower", tag: "<sp-icon-blower>", story: (size) => html`<sp-icon-blower size=${size}></sp-icon-blower>` },
  { name: "Blur", tag: "<sp-icon-blur>", story: (size) => html`<sp-icon-blur size=${size}></sp-icon-blur>` },
  { name: "Book", tag: "<sp-icon-book>", story: (size) => html`<sp-icon-book size=${size}></sp-icon-book>` },
  { name: "Bookmark", tag: "<sp-icon-bookmark>", story: (size) => html`<sp-icon-bookmark size=${size}></sp-icon-bookmark>` },
  { name: "Bookmark single", tag: "<sp-icon-bookmark-single>", story: (size) => html`<sp-icon-bookmark-single size=${size}></sp-icon-bookmark-single>` },
  { name: "Bookmark single outline", tag: "<sp-icon-bookmark-single-outline>", story: (size) => html`<sp-icon-bookmark-single-outline size=${size}></sp-icon-bookmark-single-outline>` },
  { name: "Bookmark small", tag: "<sp-icon-bookmark-small>", story: (size) => html`<sp-icon-bookmark-small size=${size}></sp-icon-bookmark-small>` },
  { name: "Bookmark small outline", tag: "<sp-icon-bookmark-small-outline>", story: (size) => html`<sp-icon-bookmark-small-outline size=${size}></sp-icon-bookmark-small-outline>` },
  { name: "Boolean", tag: "<sp-icon-boolean>", story: (size) => html`<sp-icon-boolean size=${size}></sp-icon-boolean>` },
  { name: "Border", tag: "<sp-icon-border>", story: (size) => html`<sp-icon-border size=${size}></sp-icon-border>` },
  { name: "Box", tag: "<sp-icon-box>", story: (size) => html`<sp-icon-box size=${size}></sp-icon-box>` },
  { name: "Box add", tag: "<sp-icon-box-add>", story: (size) => html`<sp-icon-box-add size=${size}></sp-icon-box-add>` },
  { name: "Box export", tag: "<sp-icon-box-export>", story: (size) => html`<sp-icon-box-export size=${size}></sp-icon-box-export>` },
  { name: "Box import", tag: "<sp-icon-box-import>", story: (size) => html`<sp-icon-box-import size=${size}></sp-icon-box-import>` },
  { name: "Brackets", tag: "<sp-icon-brackets>", story: (size) => html`<sp-icon-brackets size=${size}></sp-icon-brackets>` },
  { name: "Brackets square", tag: "<sp-icon-brackets-square>", story: (size) => html`<sp-icon-brackets-square size=${size}></sp-icon-brackets-square>` },
  { name: "Branch1", tag: "<sp-icon-branch1>", story: (size) => html`<sp-icon-branch1 size=${size}></sp-icon-branch1>` },
  { name: "Branch2", tag: "<sp-icon-branch2>", story: (size) => html`<sp-icon-branch2 size=${size}></sp-icon-branch2>` },
  { name: "Branch3", tag: "<sp-icon-branch3>", story: (size) => html`<sp-icon-branch3 size=${size}></sp-icon-branch3>` },
  { name: "Branch circle", tag: "<sp-icon-branch-circle>", story: (size) => html`<sp-icon-branch-circle size=${size}></sp-icon-branch-circle>` },
  { name: "Breadcrumb navigation", tag: "<sp-icon-breadcrumb-navigation>", story: (size) => html`<sp-icon-breadcrumb-navigation size=${size}></sp-icon-breadcrumb-navigation>` },
  { name: "Breakdown", tag: "<sp-icon-breakdown>", story: (size) => html`<sp-icon-breakdown size=${size}></sp-icon-breakdown>` },
  { name: "Breakdown add", tag: "<sp-icon-breakdown-add>", story: (size) => html`<sp-icon-breakdown-add size=${size}></sp-icon-breakdown-add>` },
  { name: "Briefcase", tag: "<sp-icon-briefcase>", story: (size) => html`<sp-icon-briefcase size=${size}></sp-icon-briefcase>` },
  { name: "Browse", tag: "<sp-icon-browse>", story: (size) => html`<sp-icon-browse size=${size}></sp-icon-browse>` },
  { name: "Brush", tag: "<sp-icon-brush>", story: (size) => html`<sp-icon-brush size=${size}></sp-icon-brush>` },
  { name: "Bug", tag: "<sp-icon-bug>", story: (size) => html`<sp-icon-bug size=${size}></sp-icon-bug>` },
  { name: "Building", tag: "<sp-icon-building>", story: (size) => html`<sp-icon-building size=${size}></sp-icon-building>` },
  { name: "Bulk edit users", tag: "<sp-icon-bulk-edit-users>", story: (size) => html`<sp-icon-bulk-edit-users size=${size}></sp-icon-bulk-edit-users>` },
  { name: "Button", tag: "<sp-icon-button>", story: (size) => html`<sp-icon-button size=${size}></sp-icon-button>` },
  { name: "Cclibrary", tag: "<sp-icon-cclibrary>", story: (size) => html`<sp-icon-cclibrary size=${size}></sp-icon-cclibrary>` },
  { name: "Calculator", tag: "<sp-icon-calculator>", story: (size) => html`<sp-icon-calculator size=${size}></sp-icon-calculator>` },
  { name: "Calendar", tag: "<sp-icon-calendar>", story: (size) => html`<sp-icon-calendar size=${size}></sp-icon-calendar>` },
  { name: "Calendar add", tag: "<sp-icon-calendar-add>", story: (size) => html`<sp-icon-calendar-add size=${size}></sp-icon-calendar-add>` },
  { name: "Calendar locked", tag: "<sp-icon-calendar-locked>", story: (size) => html`<sp-icon-calendar-locked size=${size}></sp-icon-calendar-locked>` },
  { name: "Calendar unlocked", tag: "<sp-icon-calendar-unlocked>", story: (size) => html`<sp-icon-calendar-unlocked size=${size}></sp-icon-calendar-unlocked>` },
  { name: "Call center", tag: "<sp-icon-call-center>", story: (size) => html`<sp-icon-call-center size=${size}></sp-icon-call-center>` },
  { name: "Camera", tag: "<sp-icon-camera>", story: (size) => html`<sp-icon-camera size=${size}></sp-icon-camera>` },
  { name: "Camera flip", tag: "<sp-icon-camera-flip>", story: (size) => html`<sp-icon-camera-flip size=${size}></sp-icon-camera-flip>` },
  { name: "Camera refresh", tag: "<sp-icon-camera-refresh>", story: (size) => html`<sp-icon-camera-refresh size=${size}></sp-icon-camera-refresh>` },
  { name: "Campaign", tag: "<sp-icon-campaign>", story: (size) => html`<sp-icon-campaign size=${size}></sp-icon-campaign>` },
  { name: "Campaign add", tag: "<sp-icon-campaign-add>", story: (size) => html`<sp-icon-campaign-add size=${size}></sp-icon-campaign-add>` },
  { name: "Campaign close", tag: "<sp-icon-campaign-close>", story: (size) => html`<sp-icon-campaign-close size=${size}></sp-icon-campaign-close>` },
  { name: "Campaign delete", tag: "<sp-icon-campaign-delete>", story: (size) => html`<sp-icon-campaign-delete size=${size}></sp-icon-campaign-delete>` },
  { name: "Campaign edit", tag: "<sp-icon-campaign-edit>", story: (size) => html`<sp-icon-campaign-edit size=${size}></sp-icon-campaign-edit>` },
  { name: "Cancel", tag: "<sp-icon-cancel>", story: (size) => html`<sp-icon-cancel size=${size}></sp-icon-cancel>` },
  { name: "Capitals", tag: "<sp-icon-capitals>", story: (size) => html`<sp-icon-capitals size=${size}></sp-icon-capitals>` },
  { name: "Captcha", tag: "<sp-icon-captcha>", story: (size) => html`<sp-icon-captcha size=${size}></sp-icon-captcha>` },
  { name: "Car", tag: "<sp-icon-car>", story: (size) => html`<sp-icon-car size=${size}></sp-icon-car>` },
  { name: "Card", tag: "<sp-icon-card>", story: (size) => html`<sp-icon-card size=${size}></sp-icon-card>` },
  { name: "Channel", tag: "<sp-icon-channel>", story: (size) => html`<sp-icon-channel size=${size}></sp-icon-channel>` },
  { name: "Chat", tag: "<sp-icon-chat>", story: (size) => html`<sp-icon-chat size=${size}></sp-icon-chat>` },
  { name: "Chat add", tag: "<sp-icon-chat-add>", story: (size) => html`<sp-icon-chat-add size=${size}></sp-icon-chat-add>` },
  { name: "Check pause", tag: "<sp-icon-check-pause>", story: (size) => html`<sp-icon-check-pause size=${size}></sp-icon-check-pause>` },
  { name: "Checkmark", tag: "<sp-icon-checkmark>", story: (size) => html`<sp-icon-checkmark size=${size}></sp-icon-checkmark>` },
  { name: "Checkmark circle", tag: "<sp-icon-checkmark-circle>", story: (size) => html`<sp-icon-checkmark-circle size=${size}></sp-icon-checkmark-circle>` },
  { name: "Checkmark circle outline", tag: "<sp-icon-checkmark-circle-outline>", story: (size) => html`<sp-icon-checkmark-circle-outline size=${size}></sp-icon-checkmark-circle-outline>` },
  { name: "Chevron double left", tag: "<sp-icon-chevron-double-left>", story: (size) => html`<sp-icon-chevron-double-left size=${size}></sp-icon-chevron-double-left>` },
  { name: "Chevron double right", tag: "<sp-icon-chevron-double-right>", story: (size) => html`<sp-icon-chevron-double-right size=${size}></sp-icon-chevron-double-right>` },
  { name: "Chevron down", tag: "<sp-icon-chevron-down>", story: (size) => html`<sp-icon-chevron-down size=${size}></sp-icon-chevron-down>` },
  { name: "Chevron left", tag: "<sp-icon-chevron-left>", story: (size) => html`<sp-icon-chevron-left size=${size}></sp-icon-chevron-left>` },
  { name: "Chevron right", tag: "<sp-icon-chevron-right>", story: (size) => html`<sp-icon-chevron-right size=${size}></sp-icon-chevron-right>` },
  { name: "Chevron up", tag: "<sp-icon-chevron-up>", story: (size) => html`<sp-icon-chevron-up size=${size}></sp-icon-chevron-up>` },
  { name: "Chevron up down", tag: "<sp-icon-chevron-up-down>", story: (size) => html`<sp-icon-chevron-up-down size=${size}></sp-icon-chevron-up-down>` },
  { name: "Circle", tag: "<sp-icon-circle>", story: (size) => html`<sp-icon-circle size=${size}></sp-icon-circle>` },
  { name: "Circle filled", tag: "<sp-icon-circle-filled>", story: (size) => html`<sp-icon-circle-filled size=${size}></sp-icon-circle-filled>` },
  { name: "Classic grid view", tag: "<sp-icon-classic-grid-view>", story: (size) => html`<sp-icon-classic-grid-view size=${size}></sp-icon-classic-grid-view>` },
  { name: "Clock", tag: "<sp-icon-clock>", story: (size) => html`<sp-icon-clock size=${size}></sp-icon-clock>` },
  { name: "Clock check", tag: "<sp-icon-clock-check>", story: (size) => html`<sp-icon-clock-check size=${size}></sp-icon-clock-check>` },
  { name: "Clone stamp", tag: "<sp-icon-clone-stamp>", story: (size) => html`<sp-icon-clone-stamp size=${size}></sp-icon-clone-stamp>` },
  { name: "Close", tag: "<sp-icon-close>", story: (size) => html`<sp-icon-close size=${size}></sp-icon-close>` },
  { name: "Close captions", tag: "<sp-icon-close-captions>", story: (size) => html`<sp-icon-close-captions size=${size}></sp-icon-close-captions>` },
  { name: "Close circle", tag: "<sp-icon-close-circle>", story: (size) => html`<sp-icon-close-circle size=${size}></sp-icon-close-circle>` },
  { name: "Cloud", tag: "<sp-icon-cloud>", story: (size) => html`<sp-icon-cloud size=${size}></sp-icon-cloud>` },
  { name: "Cloud disconnected", tag: "<sp-icon-cloud-disconnected>", story: (size) => html`<sp-icon-cloud-disconnected size=${size}></sp-icon-cloud-disconnected>` },
  { name: "Cloud error", tag: "<sp-icon-cloud-error>", story: (size) => html`<sp-icon-cloud-error size=${size}></sp-icon-cloud-error>` },
  { name: "Cloud outline", tag: "<sp-icon-cloud-outline>", story: (size) => html`<sp-icon-cloud-outline size=${size}></sp-icon-cloud-outline>` },
  { name: "Code", tag: "<sp-icon-code>", story: (size) => html`<sp-icon-code size=${size}></sp-icon-code>` },
  { name: "Collection", tag: "<sp-icon-collection>", story: (size) => html`<sp-icon-collection size=${size}></sp-icon-collection>` },
  { name: "Collection add", tag: "<sp-icon-collection-add>", story: (size) => html`<sp-icon-collection-add size=${size}></sp-icon-collection-add>` },
  { name: "Collection add to", tag: "<sp-icon-collection-add-to>", story: (size) => html`<sp-icon-collection-add-to size=${size}></sp-icon-collection-add-to>` },
  { name: "Collection check", tag: "<sp-icon-collection-check>", story: (size) => html`<sp-icon-collection-check size=${size}></sp-icon-collection-check>` },
  { name: "Collection edit", tag: "<sp-icon-collection-edit>", story: (size) => html`<sp-icon-collection-edit size=${size}></sp-icon-collection-edit>` },
  { name: "Collection exclude", tag: "<sp-icon-collection-exclude>", story: (size) => html`<sp-icon-collection-exclude size=${size}></sp-icon-collection-exclude>` },
  { name: "Collection link", tag: "<sp-icon-collection-link>", story: (size) => html`<sp-icon-collection-link size=${size}></sp-icon-collection-link>` },
  { name: "Color fill", tag: "<sp-icon-color-fill>", story: (size) => html`<sp-icon-color-fill size=${size}></sp-icon-color-fill>` },
  { name: "Color palette", tag: "<sp-icon-color-palette>", story: (size) => html`<sp-icon-color-palette size=${size}></sp-icon-color-palette>` },
  { name: "Color wheel", tag: "<sp-icon-color-wheel>", story: (size) => html`<sp-icon-color-wheel size=${size}></sp-icon-color-wheel>` },
  { name: "Column settings", tag: "<sp-icon-column-settings>", story: (size) => html`<sp-icon-column-settings size=${size}></sp-icon-column-settings>` },
  { name: "Column two a", tag: "<sp-icon-column-two-a>", story: (size) => html`<sp-icon-column-two-a size=${size}></sp-icon-column-two-a>` },
  { name: "Column two b", tag: "<sp-icon-column-two-b>", story: (size) => html`<sp-icon-column-two-b size=${size}></sp-icon-column-two-b>` },
  { name: "Column two c", tag: "<sp-icon-column-two-c>", story: (size) => html`<sp-icon-column-two-c size=${size}></sp-icon-column-two-c>` },
  { name: "Comment", tag: "<sp-icon-comment>", story: (size) => html`<sp-icon-comment size=${size}></sp-icon-comment>` },
  { name: "Compare", tag: "<sp-icon-compare>", story: (size) => html`<sp-icon-compare size=${size}></sp-icon-compare>` },
  { name: "Compass", tag: "<sp-icon-compass>", story: (size) => html`<sp-icon-compass size=${size}></sp-icon-compass>` },
  { name: "Condition", tag: "<sp-icon-condition>", story: (size) => html`<sp-icon-condition size=${size}></sp-icon-condition>` },
  { name: "Confidence four", tag: "<sp-icon-confidence-four>", story: (size) => html`<sp-icon-confidence-four size=${size}></sp-icon-confidence-four>` },
  { name: "Confidence one", tag: "<sp-icon-confidence-one>", story: (size) => html`<sp-icon-confidence-one size=${size}></sp-icon-confidence-one>` },
  { name: "Confidence three", tag: "<sp-icon-confidence-three>", story: (size) => html`<sp-icon-confidence-three size=${size}></sp-icon-confidence-three>` },
  { name: "Confidence two", tag: "<sp-icon-confidence-two>", story: (size) => html`<sp-icon-confidence-two size=${size}></sp-icon-confidence-two>` },
  { name: "Contrast", tag: "<sp-icon-contrast>", story: (size) => html`<sp-icon-contrast size=${size}></sp-icon-contrast>` },
  { name: "Conversion funnel", tag: "<sp-icon-conversion-funnel>", story: (size) => html`<sp-icon-conversion-funnel size=${size}></sp-icon-conversion-funnel>` },
  { name: "Copy", tag: "<sp-icon-copy>", story: (size) => html`<sp-icon-copy size=${size}></sp-icon-copy>` },
  { name: "Cover image", tag: "<sp-icon-cover-image>", story: (size) => html`<sp-icon-cover-image size=${size}></sp-icon-cover-image>` },
  { name: "Credit card", tag: "<sp-icon-credit-card>", story: (size) => html`<sp-icon-credit-card size=${size}></sp-icon-credit-card>` },
  { name: "Crop", tag: "<sp-icon-crop>", story: (size) => html`<sp-icon-crop size=${size}></sp-icon-crop>` },
  { name: "Crop lightning", tag: "<sp-icon-crop-lightning>", story: (size) => html`<sp-icon-crop-lightning size=${size}></sp-icon-crop-lightning>` },
  { name: "Crop rotate", tag: "<sp-icon-crop-rotate>", story: (size) => html`<sp-icon-crop-rotate size=${size}></sp-icon-crop-rotate>` },
  { name: "Crosshairs", tag: "<sp-icon-crosshairs>", story: (size) => html`<sp-icon-crosshairs size=${size}></sp-icon-crosshairs>` },
  { name: "Curate", tag: "<sp-icon-curate>", story: (size) => html`<sp-icon-curate size=${size}></sp-icon-curate>` },
  { name: "Cut", tag: "<sp-icon-cut>", story: (size) => html`<sp-icon-cut size=${size}></sp-icon-cut>` },
  { name: "Dashboard", tag: "<sp-icon-dashboard>", story: (size) => html`<sp-icon-dashboard size=${size}></sp-icon-dashboard>` },
  { name: "Data", tag: "<sp-icon-data>", story: (size) => html`<sp-icon-data size=${size}></sp-icon-data>` },
  { name: "Data add", tag: "<sp-icon-data-add>", story: (size) => html`<sp-icon-data-add size=${size}></sp-icon-data-add>` },
  { name: "Data book", tag: "<sp-icon-data-book>", story: (size) => html`<sp-icon-data-book size=${size}></sp-icon-data-book>` },
  { name: "Data check", tag: "<sp-icon-data-check>", story: (size) => html`<sp-icon-data-check size=${size}></sp-icon-data-check>` },
  { name: "Data correlated", tag: "<sp-icon-data-correlated>", story: (size) => html`<sp-icon-data-correlated size=${size}></sp-icon-data-correlated>` },
  { name: "Data download", tag: "<sp-icon-data-download>", story: (size) => html`<sp-icon-data-download size=${size}></sp-icon-data-download>` },
  { name: "Data edit", tag: "<sp-icon-data-edit>", story: (size) => html`<sp-icon-data-edit size=${size}></sp-icon-data-edit>` },
  { name: "Data mapping", tag: "<sp-icon-data-mapping>", story: (size) => html`<sp-icon-data-mapping size=${size}></sp-icon-data-mapping>` },
  { name: "Data refresh", tag: "<sp-icon-data-refresh>", story: (size) => html`<sp-icon-data-refresh size=${size}></sp-icon-data-refresh>` },
  { name: "Data remove", tag: "<sp-icon-data-remove>", story: (size) => html`<sp-icon-data-remove size=${size}></sp-icon-data-remove>` },
  { name: "Data settings", tag: "<sp-icon-data-settings>", story: (size) => html`<sp-icon-data-settings size=${size}></sp-icon-data-settings>` },
  { name: "Data unavailable", tag: "<sp-icon-data-unavailable>", story: (size) => html`<sp-icon-data-unavailable size=${size}></sp-icon-data-unavailable>` },
  { name: "Data upload", tag: "<sp-icon-data-upload>", story: (size) => html`<sp-icon-data-upload size=${size}></sp-icon-data-upload>` },
  { name: "Data user", tag: "<sp-icon-data-user>", story: (size) => html`<sp-icon-data-user size=${size}></sp-icon-data-user>` },
  { name: "Date", tag: "<sp-icon-date>", story: (size) => html`<sp-icon-date size=${size}></sp-icon-date>` },
  { name: "Date input", tag: "<sp-icon-date-input>", story: (size) => html`<sp-icon-date-input size=${size}></sp-icon-date-input>` },
  { name: "Deduplication", tag: "<sp-icon-deduplication>", story: (size) => html`<sp-icon-deduplication size=${size}></sp-icon-deduplication>` },
  { name: "Delegate", tag: "<sp-icon-delegate>", story: (size) => html`<sp-icon-delegate size=${size}></sp-icon-delegate>` },
  { name: "Delete", tag: "<sp-icon-delete>", story: (size) => html`<sp-icon-delete size=${size}></sp-icon-delete>` },
  { name: "Delete outline", tag: "<sp-icon-delete-outline>", story: (size) => html`<sp-icon-delete-outline size=${size}></sp-icon-delete-outline>` },
  { name: "Demographic", tag: "<sp-icon-demographic>", story: (size) => html`<sp-icon-demographic size=${size}></sp-icon-demographic>` },
  { name: "Deselect", tag: "<sp-icon-deselect>", story: (size) => html`<sp-icon-deselect size=${size}></sp-icon-deselect>` },
  { name: "Deselect circular", tag: "<sp-icon-deselect-circular>", story: (size) => html`<sp-icon-deselect-circular size=${size}></sp-icon-deselect-circular>` },
  { name: "Desktop and mobile", tag: "<sp-icon-desktop-and-mobile>", story: (size) => html`<sp-icon-desktop-and-mobile size=${size}></sp-icon-desktop-and-mobile>` },
  { name: "Device desktop", tag: "<sp-icon-device-desktop>", story: (size) => html`<sp-icon-device-desktop size=${size}></sp-icon-device-desktop>` },
  { name: "Device laptop", tag: "<sp-icon-device-laptop>", story: (size) => html`<sp-icon-device-laptop size=${size}></sp-icon-device-laptop>` },
  { name: "Device phone", tag: "<sp-icon-device-phone>", story: (size) => html`<sp-icon-device-phone size=${size}></sp-icon-device-phone>` },
  { name: "Device phone refresh", tag: "<sp-icon-device-phone-refresh>", story: (size) => html`<sp-icon-device-phone-refresh size=${size}></sp-icon-device-phone-refresh>` },
  { name: "Device preview", tag: "<sp-icon-device-preview>", story: (size) => html`<sp-icon-device-preview size=${size}></sp-icon-device-preview>` },
  { name: "Device rotate landscape", tag: "<sp-icon-device-rotate-landscape>", story: (size) => html`<sp-icon-device-rotate-landscape size=${size}></sp-icon-device-rotate-landscape>` },
  { name: "Device rotate portrait", tag: "<sp-icon-device-rotate-portrait>", story: (size) => html`<sp-icon-device-rotate-portrait size=${size}></sp-icon-device-rotate-portrait>` },
  { name: "Device t v", tag: "<sp-icon-device-t-v>", story: (size) => html`<sp-icon-device-t-v size=${size}></sp-icon-device-t-v>` },
  { name: "Device tablet", tag: "<sp-icon-device-tablet>", story: (size) => html`<sp-icon-device-tablet size=${size}></sp-icon-device-tablet>` },
  { name: "Devices", tag: "<sp-icon-devices>", story: (size) => html`<sp-icon-devices size=${size}></sp-icon-devices>` },
  { name: "Discover", tag: "<sp-icon-discover>", story: (size) => html`<sp-icon-discover size=${size}></sp-icon-discover>` },
  { name: "Discover outline", tag: "<sp-icon-discover-outline>", story: (size) => html`<sp-icon-discover-outline size=${size}></sp-icon-discover-outline>` },
  { name: "Distribute bottom edge", tag: "<sp-icon-distribute-bottom-edge>", story: (size) => html`<sp-icon-distribute-bottom-edge size=${size}></sp-icon-distribute-bottom-edge>` },
  { name: "Distribute horizontal center", tag: "<sp-icon-distribute-horizontal-center>", story: (size) => html`<sp-icon-distribute-horizontal-center size=${size}></sp-icon-distribute-horizontal-center>` },
  { name: "Distribute horizontally", tag: "<sp-icon-distribute-horizontally>", story: (size) => html`<sp-icon-distribute-horizontally size=${size}></sp-icon-distribute-horizontally>` },
  { name: "Distribute left edge", tag: "<sp-icon-distribute-left-edge>", story: (size) => html`<sp-icon-distribute-left-edge size=${size}></sp-icon-distribute-left-edge>` },
  { name: "Distribute right edge", tag: "<sp-icon-distribute-right-edge>", story: (size) => html`<sp-icon-distribute-right-edge size=${size}></sp-icon-distribute-right-edge>` },
  { name: "Distribute space horiz", tag: "<sp-icon-distribute-space-horiz>", story: (size) => html`<sp-icon-distribute-space-horiz size=${size}></sp-icon-distribute-space-horiz>` },
  { name: "Distribute space vert", tag: "<sp-icon-distribute-space-vert>", story: (size) => html`<sp-icon-distribute-space-vert size=${size}></sp-icon-distribute-space-vert>` },
  { name: "Distribute top edge", tag: "<sp-icon-distribute-top-edge>", story: (size) => html`<sp-icon-distribute-top-edge size=${size}></sp-icon-distribute-top-edge>` },
  { name: "Distribute vertical center", tag: "<sp-icon-distribute-vertical-center>", story: (size) => html`<sp-icon-distribute-vertical-center size=${size}></sp-icon-distribute-vertical-center>` },
  { name: "Distribute vertically", tag: "<sp-icon-distribute-vertically>", story: (size) => html`<sp-icon-distribute-vertically size=${size}></sp-icon-distribute-vertically>` },
  { name: "Divide", tag: "<sp-icon-divide>", story: (size) => html`<sp-icon-divide size=${size}></sp-icon-divide>` },
  { name: "Divide path", tag: "<sp-icon-divide-path>", story: (size) => html`<sp-icon-divide-path size=${size}></sp-icon-divide-path>` },
  { name: "Document", tag: "<sp-icon-document>", story: (size) => html`<sp-icon-document size=${size}></sp-icon-document>` },
  { name: "Document fragment", tag: "<sp-icon-document-fragment>", story: (size) => html`<sp-icon-document-fragment size=${size}></sp-icon-document-fragment>` },
  { name: "Document fragment group", tag: "<sp-icon-document-fragment-group>", story: (size) => html`<sp-icon-document-fragment-group size=${size}></sp-icon-document-fragment-group>` },
  { name: "Document outline", tag: "<sp-icon-document-outline>", story: (size) => html`<sp-icon-document-outline size=${size}></sp-icon-document-outline>` },
  { name: "Document refresh", tag: "<sp-icon-document-refresh>", story: (size) => html`<sp-icon-document-refresh size=${size}></sp-icon-document-refresh>` },
  { name: "Dolly", tag: "<sp-icon-dolly>", story: (size) => html`<sp-icon-dolly size=${size}></sp-icon-dolly>` },
  { name: "Download", tag: "<sp-icon-download>", story: (size) => html`<sp-icon-download size=${size}></sp-icon-download>` },
  { name: "Download from cloud", tag: "<sp-icon-download-from-cloud>", story: (size) => html`<sp-icon-download-from-cloud size=${size}></sp-icon-download-from-cloud>` },
  { name: "Download from cloud outline", tag: "<sp-icon-download-from-cloud-outline>", story: (size) => html`<sp-icon-download-from-cloud-outline size=${size}></sp-icon-download-from-cloud-outline>` },
  { name: "Draft", tag: "<sp-icon-draft>", story: (size) => html`<sp-icon-draft size=${size}></sp-icon-draft>` },
  { name: "Drag handle", tag: "<sp-icon-drag-handle>", story: (size) => html`<sp-icon-drag-handle size=${size}></sp-icon-drag-handle>` },
  { name: "Draw", tag: "<sp-icon-draw>", story: (size) => html`<sp-icon-draw size=${size}></sp-icon-draw>` },
  { name: "Dropdown", tag: "<sp-icon-dropdown>", story: (size) => html`<sp-icon-dropdown size=${size}></sp-icon-dropdown>` },
  { name: "Duplicate", tag: "<sp-icon-duplicate>", story: (size) => html`<sp-icon-duplicate size=${size}></sp-icon-duplicate>` },
  { name: "Edit", tag: "<sp-icon-edit>", story: (size) => html`<sp-icon-edit size=${size}></sp-icon-edit>` },
  { name: "Edit circle", tag: "<sp-icon-edit-circle>", story: (size) => html`<sp-icon-edit-circle size=${size}></sp-icon-edit-circle>` },
  { name: "Edit exclude", tag: "<sp-icon-edit-exclude>", story: (size) => html`<sp-icon-edit-exclude size=${size}></sp-icon-edit-exclude>` },
  { name: "Edit in", tag: "<sp-icon-edit-in>", story: (size) => html`<sp-icon-edit-in size=${size}></sp-icon-edit-in>` },
  { name: "Edit in light", tag: "<sp-icon-edit-in-light>", story: (size) => html`<sp-icon-edit-in-light size=${size}></sp-icon-edit-in-light>` },
  { name: "Education", tag: "<sp-icon-education>", story: (size) => html`<sp-icon-education size=${size}></sp-icon-education>` },
  { name: "Effects", tag: "<sp-icon-effects>", story: (size) => html`<sp-icon-effects size=${size}></sp-icon-effects>` },
  { name: "Efficient", tag: "<sp-icon-efficient>", story: (size) => html`<sp-icon-efficient size=${size}></sp-icon-efficient>` },
  { name: "Ellipse", tag: "<sp-icon-ellipse>", story: (size) => html`<sp-icon-ellipse size=${size}></sp-icon-ellipse>` },
  { name: "Email", tag: "<sp-icon-email>", story: (size) => html`<sp-icon-email size=${size}></sp-icon-email>` },
  { name: "Email cancel", tag: "<sp-icon-email-cancel>", story: (size) => html`<sp-icon-email-cancel size=${size}></sp-icon-email-cancel>` },
  { name: "Email check", tag: "<sp-icon-email-check>", story: (size) => html`<sp-icon-email-check size=${size}></sp-icon-email-check>` },
  { name: "Email exclude", tag: "<sp-icon-email-exclude>", story: (size) => html`<sp-icon-email-exclude size=${size}></sp-icon-email-exclude>` },
  { name: "Email exclude outline", tag: "<sp-icon-email-exclude-outline>", story: (size) => html`<sp-icon-email-exclude-outline size=${size}></sp-icon-email-exclude-outline>` },
  { name: "Email gear", tag: "<sp-icon-email-gear>", story: (size) => html`<sp-icon-email-gear size=${size}></sp-icon-email-gear>` },
  { name: "Email gear outline", tag: "<sp-icon-email-gear-outline>", story: (size) => html`<sp-icon-email-gear-outline size=${size}></sp-icon-email-gear-outline>` },
  { name: "Email key", tag: "<sp-icon-email-key>", story: (size) => html`<sp-icon-email-key size=${size}></sp-icon-email-key>` },
  { name: "Email key outline", tag: "<sp-icon-email-key-outline>", story: (size) => html`<sp-icon-email-key-outline size=${size}></sp-icon-email-key-outline>` },
  { name: "Email lightning", tag: "<sp-icon-email-lightning>", story: (size) => html`<sp-icon-email-lightning size=${size}></sp-icon-email-lightning>` },
  { name: "Email notification", tag: "<sp-icon-email-notification>", story: (size) => html`<sp-icon-email-notification size=${size}></sp-icon-email-notification>` },
  { name: "Email outline", tag: "<sp-icon-email-outline>", story: (size) => html`<sp-icon-email-outline size=${size}></sp-icon-email-outline>` },
  { name: "Email refresh", tag: "<sp-icon-email-refresh>", story: (size) => html`<sp-icon-email-refresh size=${size}></sp-icon-email-refresh>` },
  { name: "Email schedule", tag: "<sp-icon-email-schedule>", story: (size) => html`<sp-icon-email-schedule size=${size}></sp-icon-email-schedule>` },
  { name: "Engagement", tag: "<sp-icon-engagement>", story: (size) => html`<sp-icon-engagement size=${size}></sp-icon-engagement>` },
  { name: "Enterprise", tag: "<sp-icon-enterprise>", story: (size) => html`<sp-icon-enterprise size=${size}></sp-icon-enterprise>` },
  { name: "Erase", tag: "<sp-icon-erase>", story: (size) => html`<sp-icon-erase size=${size}></sp-icon-erase>` },
  { name: "Event", tag: "<sp-icon-event>", story: (size) => html`<sp-icon-event size=${size}></sp-icon-event>` },
  { name: "Event exclude", tag: "<sp-icon-event-exclude>", story: (size) => html`<sp-icon-event-exclude size=${size}></sp-icon-event-exclude>` },
  { name: "Event share", tag: "<sp-icon-event-share>", story: (size) => html`<sp-icon-event-share size=${size}></sp-icon-event-share>` },
  { name: "Events", tag: "<sp-icon-events>", story: (size) => html`<sp-icon-events size=${size}></sp-icon-events>` },
  { name: "Exclude overlap", tag: "<sp-icon-exclude-overlap>", story: (size) => html`<sp-icon-exclude-overlap size=${size}></sp-icon-exclude-overlap>` },
  { name: "Experience", tag: "<sp-icon-experience>", story: (size) => html`<sp-icon-experience size=${size}></sp-icon-experience>` },
  { name: "Experience add", tag: "<sp-icon-experience-add>", story: (size) => html`<sp-icon-experience-add size=${size}></sp-icon-experience-add>` },
  { name: "Experience add to", tag: "<sp-icon-experience-add-to>", story: (size) => html`<sp-icon-experience-add-to size=${size}></sp-icon-experience-add-to>` },
  { name: "Experience export", tag: "<sp-icon-experience-export>", story: (size) => html`<sp-icon-experience-export size=${size}></sp-icon-experience-export>` },
  { name: "Experience import", tag: "<sp-icon-experience-import>", story: (size) => html`<sp-icon-experience-import size=${size}></sp-icon-experience-import>` },
  { name: "Export", tag: "<sp-icon-export>", story: (size) => html`<sp-icon-export size=${size}></sp-icon-export>` },
  { name: "Export original", tag: "<sp-icon-export-original>", story: (size) => html`<sp-icon-export-original size=${size}></sp-icon-export-original>` },
  { name: "Exposure", tag: "<sp-icon-exposure>", story: (size) => html`<sp-icon-exposure size=${size}></sp-icon-exposure>` },
  { name: "Extension", tag: "<sp-icon-extension>", story: (size) => html`<sp-icon-extension size=${size}></sp-icon-extension>` },
  { name: "Facebook cover image", tag: "<sp-icon-facebook-cover-image>", story: (size) => html`<sp-icon-facebook-cover-image size=${size}></sp-icon-facebook-cover-image>` },
  { name: "Fast", tag: "<sp-icon-fast>", story: (size) => html`<sp-icon-fast size=${size}></sp-icon-fast>` },
  { name: "Fast forward", tag: "<sp-icon-fast-forward>", story: (size) => html`<sp-icon-fast-forward size=${size}></sp-icon-fast-forward>` },
  { name: "Fast forward circle", tag: "<sp-icon-fast-forward-circle>", story: (size) => html`<sp-icon-fast-forward-circle size=${size}></sp-icon-fast-forward-circle>` },
  { name: "Feature", tag: "<sp-icon-feature>", story: (size) => html`<sp-icon-feature size=${size}></sp-icon-feature>` },
  { name: "Feed", tag: "<sp-icon-feed>", story: (size) => html`<sp-icon-feed size=${size}></sp-icon-feed>` },
  { name: "Feed add", tag: "<sp-icon-feed-add>", story: (size) => html`<sp-icon-feed-add size=${size}></sp-icon-feed-add>` },
  { name: "Feed management", tag: "<sp-icon-feed-management>", story: (size) => html`<sp-icon-feed-management size=${size}></sp-icon-feed-management>` },
  { name: "Feedback", tag: "<sp-icon-feedback>", story: (size) => html`<sp-icon-feedback size=${size}></sp-icon-feedback>` },
  { name: "File add", tag: "<sp-icon-file-add>", story: (size) => html`<sp-icon-file-add size=${size}></sp-icon-file-add>` },
  { name: "File cs v", tag: "<sp-icon-file-cs-v>", story: (size) => html`<sp-icon-file-cs-v size=${size}></sp-icon-file-cs-v>` },
  { name: "File campaign", tag: "<sp-icon-file-campaign>", story: (size) => html`<sp-icon-file-campaign size=${size}></sp-icon-file-campaign>` },
  { name: "File chart", tag: "<sp-icon-file-chart>", story: (size) => html`<sp-icon-file-chart size=${size}></sp-icon-file-chart>` },
  { name: "File checked out", tag: "<sp-icon-file-checked-out>", story: (size) => html`<sp-icon-file-checked-out size=${size}></sp-icon-file-checked-out>` },
  { name: "File code", tag: "<sp-icon-file-code>", story: (size) => html`<sp-icon-file-code size=${size}></sp-icon-file-code>` },
  { name: "File data", tag: "<sp-icon-file-data>", story: (size) => html`<sp-icon-file-data size=${size}></sp-icon-file-data>` },
  { name: "File email", tag: "<sp-icon-file-email>", story: (size) => html`<sp-icon-file-email size=${size}></sp-icon-file-email>` },
  { name: "File excel", tag: "<sp-icon-file-excel>", story: (size) => html`<sp-icon-file-excel size=${size}></sp-icon-file-excel>` },
  { name: "File folder", tag: "<sp-icon-file-folder>", story: (size) => html`<sp-icon-file-folder size=${size}></sp-icon-file-folder>` },
  { name: "File gear", tag: "<sp-icon-file-gear>", story: (size) => html`<sp-icon-file-gear size=${size}></sp-icon-file-gear>` },
  { name: "File globe", tag: "<sp-icon-file-globe>", story: (size) => html`<sp-icon-file-globe size=${size}></sp-icon-file-globe>` },
  { name: "File htm l", tag: "<sp-icon-file-htm-l>", story: (size) => html`<sp-icon-file-htm-l size=${size}></sp-icon-file-htm-l>` },
  { name: "File important", tag: "<sp-icon-file-important>", story: (size) => html`<sp-icon-file-important size=${size}></sp-icon-file-important>` },
  { name: "File json", tag: "<sp-icon-file-json>", story: (size) => html`<sp-icon-file-json size=${size}></sp-icon-file-json>` },
  { name: "File key", tag: "<sp-icon-file-key>", story: (size) => html`<sp-icon-file-key size=${size}></sp-icon-file-key>` },
  { name: "File mobile", tag: "<sp-icon-file-mobile>", story: (size) => html`<sp-icon-file-mobile size=${size}></sp-icon-file-mobile>` },
  { name: "File pd f", tag: "<sp-icon-file-pd-f>", story: (size) => html`<sp-icon-file-pd-f size=${size}></sp-icon-file-pd-f>` },
  { name: "File share", tag: "<sp-icon-file-share>", story: (size) => html`<sp-icon-file-share size=${size}></sp-icon-file-share>` },
  { name: "File single web page", tag: "<sp-icon-file-single-web-page>", story: (size) => html`<sp-icon-file-single-web-page size=${size}></sp-icon-file-single-web-page>` },
  { name: "File space", tag: "<sp-icon-file-space>", story: (size) => html`<sp-icon-file-space size=${size}></sp-icon-file-space>` },
  { name: "File template", tag: "<sp-icon-file-template>", story: (size) => html`<sp-icon-file-template size=${size}></sp-icon-file-template>` },
  { name: "File txt", tag: "<sp-icon-file-txt>", story: (size) => html`<sp-icon-file-txt size=${size}></sp-icon-file-txt>` },
  { name: "File user", tag: "<sp-icon-file-user>", story: (size) => html`<sp-icon-file-user size=${size}></sp-icon-file-user>` },
  { name: "File word", tag: "<sp-icon-file-word>", story: (size) => html`<sp-icon-file-word size=${size}></sp-icon-file-word>` },
  { name: "File workflow", tag: "<sp-icon-file-workflow>", story: (size) => html`<sp-icon-file-workflow size=${size}></sp-icon-file-workflow>` },
  { name: "File xm l", tag: "<sp-icon-file-xm-l>", story: (size) => html`<sp-icon-file-xm-l size=${size}></sp-icon-file-xm-l>` },
  { name: "File zip", tag: "<sp-icon-file-zip>", story: (size) => html`<sp-icon-file-zip size=${size}></sp-icon-file-zip>` },
  { name: "Filing cabinet", tag: "<sp-icon-filing-cabinet>", story: (size) => html`<sp-icon-filing-cabinet size=${size}></sp-icon-filing-cabinet>` },
  { name: "Filmroll", tag: "<sp-icon-filmroll>", story: (size) => html`<sp-icon-filmroll size=${size}></sp-icon-filmroll>` },
  { name: "Filmroll auto add", tag: "<sp-icon-filmroll-auto-add>", story: (size) => html`<sp-icon-filmroll-auto-add size=${size}></sp-icon-filmroll-auto-add>` },
  { name: "Filter", tag: "<sp-icon-filter>", story: (size) => html`<sp-icon-filter size=${size}></sp-icon-filter>` },
  { name: "Filter add", tag: "<sp-icon-filter-add>", story: (size) => html`<sp-icon-filter-add size=${size}></sp-icon-filter-add>` },
  { name: "Filter check", tag: "<sp-icon-filter-check>", story: (size) => html`<sp-icon-filter-check size=${size}></sp-icon-filter-check>` },
  { name: "Filter delete", tag: "<sp-icon-filter-delete>", story: (size) => html`<sp-icon-filter-delete size=${size}></sp-icon-filter-delete>` },
  { name: "Filter edit", tag: "<sp-icon-filter-edit>", story: (size) => html`<sp-icon-filter-edit size=${size}></sp-icon-filter-edit>` },
  { name: "Filter heart", tag: "<sp-icon-filter-heart>", story: (size) => html`<sp-icon-filter-heart size=${size}></sp-icon-filter-heart>` },
  { name: "Filter remove", tag: "<sp-icon-filter-remove>", story: (size) => html`<sp-icon-filter-remove size=${size}></sp-icon-filter-remove>` },
  { name: "Filter star", tag: "<sp-icon-filter-star>", story: (size) => html`<sp-icon-filter-star size=${size}></sp-icon-filter-star>` },
  { name: "Find and replace", tag: "<sp-icon-find-and-replace>", story: (size) => html`<sp-icon-find-and-replace size=${size}></sp-icon-find-and-replace>` },
  { name: "Flag", tag: "<sp-icon-flag>", story: (size) => html`<sp-icon-flag size=${size}></sp-icon-flag>` },
  { name: "Flag exclude", tag: "<sp-icon-flag-exclude>", story: (size) => html`<sp-icon-flag-exclude size=${size}></sp-icon-flag-exclude>` },
  { name: "Flash auto", tag: "<sp-icon-flash-auto>", story: (size) => html`<sp-icon-flash-auto size=${size}></sp-icon-flash-auto>` },
  { name: "Flash off", tag: "<sp-icon-flash-off>", story: (size) => html`<sp-icon-flash-off size=${size}></sp-icon-flash-off>` },
  { name: "Flash on", tag: "<sp-icon-flash-on>", story: (size) => html`<sp-icon-flash-on size=${size}></sp-icon-flash-on>` },
  { name: "Flashlight", tag: "<sp-icon-flashlight>", story: (size) => html`<sp-icon-flashlight size=${size}></sp-icon-flashlight>` },
  { name: "Flashlight off", tag: "<sp-icon-flashlight-off>", story: (size) => html`<sp-icon-flashlight-off size=${size}></sp-icon-flashlight-off>` },
  { name: "Flashlight on", tag: "<sp-icon-flashlight-on>", story: (size) => html`<sp-icon-flashlight-on size=${size}></sp-icon-flashlight-on>` },
  { name: "Flip horizontal", tag: "<sp-icon-flip-horizontal>", story: (size) => html`<sp-icon-flip-horizontal size=${size}></sp-icon-flip-horizontal>` },
  { name: "Flip vertical", tag: "<sp-icon-flip-vertical>", story: (size) => html`<sp-icon-flip-vertical size=${size}></sp-icon-flip-vertical>` },
  { name: "Folder", tag: "<sp-icon-folder>", story: (size) => html`<sp-icon-folder size=${size}></sp-icon-folder>` },
  { name: "Folder2 color", tag: "<sp-icon-folder2-color>", story: (size) => html`<sp-icon-folder2-color size=${size}></sp-icon-folder2-color>` },
  { name: "Folder add", tag: "<sp-icon-folder-add>", story: (size) => html`<sp-icon-folder-add size=${size}></sp-icon-folder-add>` },
  { name: "Folder add to", tag: "<sp-icon-folder-add-to>", story: (size) => html`<sp-icon-folder-add-to size=${size}></sp-icon-folder-add-to>` },
  { name: "Folder archive", tag: "<sp-icon-folder-archive>", story: (size) => html`<sp-icon-folder-archive size=${size}></sp-icon-folder-archive>` },
  { name: "Folder delete", tag: "<sp-icon-folder-delete>", story: (size) => html`<sp-icon-folder-delete size=${size}></sp-icon-folder-delete>` },
  { name: "Folder gear", tag: "<sp-icon-folder-gear>", story: (size) => html`<sp-icon-folder-gear size=${size}></sp-icon-folder-gear>` },
  { name: "Folder locked", tag: "<sp-icon-folder-locked>", story: (size) => html`<sp-icon-folder-locked size=${size}></sp-icon-folder-locked>` },
  { name: "Folder open", tag: "<sp-icon-folder-open>", story: (size) => html`<sp-icon-folder-open size=${size}></sp-icon-folder-open>` },
  { name: "Folder open outline", tag: "<sp-icon-folder-open-outline>", story: (size) => html`<sp-icon-folder-open-outline size=${size}></sp-icon-folder-open-outline>` },
  { name: "Folder outline", tag: "<sp-icon-folder-outline>", story: (size) => html`<sp-icon-folder-outline size=${size}></sp-icon-folder-outline>` },
  { name: "Folder remove", tag: "<sp-icon-folder-remove>", story: (size) => html`<sp-icon-folder-remove size=${size}></sp-icon-folder-remove>` },
  { name: "Folder search", tag: "<sp-icon-folder-search>", story: (size) => html`<sp-icon-folder-search size=${size}></sp-icon-folder-search>` },
  { name: "Folder user", tag: "<sp-icon-folder-user>", story: (size) => html`<sp-icon-folder-user size=${size}></sp-icon-folder-user>` },
  { name: "Follow", tag: "<sp-icon-follow>", story: (size) => html`<sp-icon-follow size=${size}></sp-icon-follow>` },
  { name: "Follow off", tag: "<sp-icon-follow-off>", story: (size) => html`<sp-icon-follow-off size=${size}></sp-icon-follow-off>` },
  { name: "For placement only", tag: "<sp-icon-for-placement-only>", story: (size) => html`<sp-icon-for-placement-only size=${size}></sp-icon-for-placement-only>` },
  { name: "Forecast", tag: "<sp-icon-forecast>", story: (size) => html`<sp-icon-forecast size=${size}></sp-icon-forecast>` },
  { name: "Form", tag: "<sp-icon-form>", story: (size) => html`<sp-icon-form size=${size}></sp-icon-form>` },
  { name: "Forward", tag: "<sp-icon-forward>", story: (size) => html`<sp-icon-forward size=${size}></sp-icon-forward>` },
  { name: "Full screen", tag: "<sp-icon-full-screen>", story: (size) => html`<sp-icon-full-screen size=${size}></sp-icon-full-screen>` },
  { name: "Full screen exit", tag: "<sp-icon-full-screen-exit>", story: (size) => html`<sp-icon-full-screen-exit size=${size}></sp-icon-full-screen-exit>` },
  { name: "Function", tag: "<sp-icon-function>", story: (size) => html`<sp-icon-function size=${size}></sp-icon-function>` },
  { name: "Game", tag: "<sp-icon-game>", story: (size) => html`<sp-icon-game size=${size}></sp-icon-game>` },
  { name: "Gauge1", tag: "<sp-icon-gauge1>", story: (size) => html`<sp-icon-gauge1 size=${size}></sp-icon-gauge1>` },
  { name: "Gauge2", tag: "<sp-icon-gauge2>", story: (size) => html`<sp-icon-gauge2 size=${size}></sp-icon-gauge2>` },
  { name: "Gauge3", tag: "<sp-icon-gauge3>", story: (size) => html`<sp-icon-gauge3 size=${size}></sp-icon-gauge3>` },
  { name: "Gauge4", tag: "<sp-icon-gauge4>", story: (size) => html`<sp-icon-gauge4 size=${size}></sp-icon-gauge4>` },
  { name: "Gauge5", tag: "<sp-icon-gauge5>", story: (size) => html`<sp-icon-gauge5 size=${size}></sp-icon-gauge5>` },
  { name: "Gears", tag: "<sp-icon-gears>", story: (size) => html`<sp-icon-gears size=${size}></sp-icon-gears>` },
  { name: "Gears add", tag: "<sp-icon-gears-add>", story: (size) => html`<sp-icon-gears-add size=${size}></sp-icon-gears-add>` },
  { name: "Gears delete", tag: "<sp-icon-gears-delete>", story: (size) => html`<sp-icon-gears-delete size=${size}></sp-icon-gears-delete>` },
  { name: "Gears edit", tag: "<sp-icon-gears-edit>", story: (size) => html`<sp-icon-gears-edit size=${size}></sp-icon-gears-edit>` },
  { name: "Gender female", tag: "<sp-icon-gender-female>", story: (size) => html`<sp-icon-gender-female size=${size}></sp-icon-gender-female>` },
  { name: "Gender male", tag: "<sp-icon-gender-male>", story: (size) => html`<sp-icon-gender-male size=${size}></sp-icon-gender-male>` },
  { name: "Gift", tag: "<sp-icon-gift>", story: (size) => html`<sp-icon-gift size=${size}></sp-icon-gift>` },
  { name: "Globe", tag: "<sp-icon-globe>", story: (size) => html`<sp-icon-globe size=${size}></sp-icon-globe>` },
  { name: "Globe check", tag: "<sp-icon-globe-check>", story: (size) => html`<sp-icon-globe-check size=${size}></sp-icon-globe-check>` },
  { name: "Globe clock", tag: "<sp-icon-globe-clock>", story: (size) => html`<sp-icon-globe-clock size=${size}></sp-icon-globe-clock>` },
  { name: "Globe enter", tag: "<sp-icon-globe-enter>", story: (size) => html`<sp-icon-globe-enter size=${size}></sp-icon-globe-enter>` },
  { name: "Globe exit", tag: "<sp-icon-globe-exit>", story: (size) => html`<sp-icon-globe-exit size=${size}></sp-icon-globe-exit>` },
  { name: "Globe grid", tag: "<sp-icon-globe-grid>", story: (size) => html`<sp-icon-globe-grid size=${size}></sp-icon-globe-grid>` },
  { name: "Globe outline", tag: "<sp-icon-globe-outline>", story: (size) => html`<sp-icon-globe-outline size=${size}></sp-icon-globe-outline>` },
  { name: "Globe remove", tag: "<sp-icon-globe-remove>", story: (size) => html`<sp-icon-globe-remove size=${size}></sp-icon-globe-remove>` },
  { name: "Globe search", tag: "<sp-icon-globe-search>", story: (size) => html`<sp-icon-globe-search size=${size}></sp-icon-globe-search>` },
  { name: "Globe strike", tag: "<sp-icon-globe-strike>", story: (size) => html`<sp-icon-globe-strike size=${size}></sp-icon-globe-strike>` },
  { name: "Globe strike clock", tag: "<sp-icon-globe-strike-clock>", story: (size) => html`<sp-icon-globe-strike-clock size=${size}></sp-icon-globe-strike-clock>` },
  { name: "Government", tag: "<sp-icon-government>", story: (size) => html`<sp-icon-government size=${size}></sp-icon-government>` },
  { name: "Gradient", tag: "<sp-icon-gradient>", story: (size) => html`<sp-icon-gradient size=${size}></sp-icon-gradient>` },
  { name: "Graph area", tag: "<sp-icon-graph-area>", story: (size) => html`<sp-icon-graph-area size=${size}></sp-icon-graph-area>` },
  { name: "Graph area stacked", tag: "<sp-icon-graph-area-stacked>", story: (size) => html`<sp-icon-graph-area-stacked size=${size}></sp-icon-graph-area-stacked>` },
  { name: "Graph bar horizontal", tag: "<sp-icon-graph-bar-horizontal>", story: (size) => html`<sp-icon-graph-bar-horizontal size=${size}></sp-icon-graph-bar-horizontal>` },
  { name: "Graph bar horizontal add", tag: "<sp-icon-graph-bar-horizontal-add>", story: (size) => html`<sp-icon-graph-bar-horizontal-add size=${size}></sp-icon-graph-bar-horizontal-add>` },
  { name: "Graph bar horizontal stacked", tag: "<sp-icon-graph-bar-horizontal-stacked>", story: (size) => html`<sp-icon-graph-bar-horizontal-stacked size=${size}></sp-icon-graph-bar-horizontal-stacked>` },
  { name: "Graph bar vertical", tag: "<sp-icon-graph-bar-vertical>", story: (size) => html`<sp-icon-graph-bar-vertical size=${size}></sp-icon-graph-bar-vertical>` },
  { name: "Graph bar vertical add", tag: "<sp-icon-graph-bar-vertical-add>", story: (size) => html`<sp-icon-graph-bar-vertical-add size=${size}></sp-icon-graph-bar-vertical-add>` },
  { name: "Graph bar vertical stacked", tag: "<sp-icon-graph-bar-vertical-stacked>", story: (size) => html`<sp-icon-graph-bar-vertical-stacked size=${size}></sp-icon-graph-bar-vertical-stacked>` },
  { name: "Graph bubble", tag: "<sp-icon-graph-bubble>", story: (size) => html`<sp-icon-graph-bubble size=${size}></sp-icon-graph-bubble>` },
  { name: "Graph bullet", tag: "<sp-icon-graph-bullet>", story: (size) => html`<sp-icon-graph-bullet size=${size}></sp-icon-graph-bullet>` },
  { name: "Graph confidence bands", tag: "<sp-icon-graph-confidence-bands>", story: (size) => html`<sp-icon-graph-confidence-bands size=${size}></sp-icon-graph-confidence-bands>` },
  { name: "Graph donut", tag: "<sp-icon-graph-donut>", story: (size) => html`<sp-icon-graph-donut size=${size}></sp-icon-graph-donut>` },
  { name: "Graph donut add", tag: "<sp-icon-graph-donut-add>", story: (size) => html`<sp-icon-graph-donut-add size=${size}></sp-icon-graph-donut-add>` },
  { name: "Graph gantt", tag: "<sp-icon-graph-gantt>", story: (size) => html`<sp-icon-graph-gantt size=${size}></sp-icon-graph-gantt>` },
  { name: "Graph histogram", tag: "<sp-icon-graph-histogram>", story: (size) => html`<sp-icon-graph-histogram size=${size}></sp-icon-graph-histogram>` },
  { name: "Graph pathing", tag: "<sp-icon-graph-pathing>", story: (size) => html`<sp-icon-graph-pathing size=${size}></sp-icon-graph-pathing>` },
  { name: "Graph pie", tag: "<sp-icon-graph-pie>", story: (size) => html`<sp-icon-graph-pie size=${size}></sp-icon-graph-pie>` },
  { name: "Graph profit curve", tag: "<sp-icon-graph-profit-curve>", story: (size) => html`<sp-icon-graph-profit-curve size=${size}></sp-icon-graph-profit-curve>` },
  { name: "Graph scatter", tag: "<sp-icon-graph-scatter>", story: (size) => html`<sp-icon-graph-scatter size=${size}></sp-icon-graph-scatter>` },
  { name: "Graph stream", tag: "<sp-icon-graph-stream>", story: (size) => html`<sp-icon-graph-stream size=${size}></sp-icon-graph-stream>` },
  { name: "Graph stream ranked", tag: "<sp-icon-graph-stream-ranked>", story: (size) => html`<sp-icon-graph-stream-ranked size=${size}></sp-icon-graph-stream-ranked>` },
  { name: "Graph stream ranked add", tag: "<sp-icon-graph-stream-ranked-add>", story: (size) => html`<sp-icon-graph-stream-ranked-add size=${size}></sp-icon-graph-stream-ranked-add>` },
  { name: "Graph sunburst", tag: "<sp-icon-graph-sunburst>", story: (size) => html`<sp-icon-graph-sunburst size=${size}></sp-icon-graph-sunburst>` },
  { name: "Graph tree", tag: "<sp-icon-graph-tree>", story: (size) => html`<sp-icon-graph-tree size=${size}></sp-icon-graph-tree>` },
  { name: "Graph trend", tag: "<sp-icon-graph-trend>", story: (size) => html`<sp-icon-graph-trend size=${size}></sp-icon-graph-trend>` },
  { name: "Graph trend add", tag: "<sp-icon-graph-trend-add>", story: (size) => html`<sp-icon-graph-trend-add size=${size}></sp-icon-graph-trend-add>` },
  { name: "Graph trend alert", tag: "<sp-icon-graph-trend-alert>", story: (size) => html`<sp-icon-graph-trend-alert size=${size}></sp-icon-graph-trend-alert>` },
  { name: "Graphic", tag: "<sp-icon-graphic>", story: (size) => html`<sp-icon-graphic size=${size}></sp-icon-graphic>` },
  { name: "Group", tag: "<sp-icon-group>", story: (size) => html`<sp-icon-group size=${size}></sp-icon-group>` },
  { name: "Hammer", tag: "<sp-icon-hammer>", story: (size) => html`<sp-icon-hammer size=${size}></sp-icon-hammer>` },
  { name: "Hand", tag: "<sp-icon-hand>", story: (size) => html`<sp-icon-hand size=${size}></sp-icon-hand>` },
  { name: "Hand0", tag: "<sp-icon-hand0>", story: (size) => html`<sp-icon-hand0 size=${size}></sp-icon-hand0>` },
  { name: "Hand1", tag: "<sp-icon-hand1>", story: (size) => html`<sp-icon-hand1 size=${size}></sp-icon-hand1>` },
  { name: "Hand2", tag: "<sp-icon-hand2>", story: (size) => html`<sp-icon-hand2 size=${size}></sp-icon-hand2>` },
  { name: "Hand3", tag: "<sp-icon-hand3>", story: (size) => html`<sp-icon-hand3 size=${size}></sp-icon-hand3>` },
  { name: "Hand4", tag: "<sp-icon-hand4>", story: (size) => html`<sp-icon-hand4 size=${size}></sp-icon-hand4>` },
  { name: "Heal", tag: "<sp-icon-heal>", story: (size) => html`<sp-icon-heal size=${size}></sp-icon-heal>` },
  { name: "Heart", tag: "<sp-icon-heart>", story: (size) => html`<sp-icon-heart size=${size}></sp-icon-heart>` },
  { name: "Help", tag: "<sp-icon-help>", story: (size) => html`<sp-icon-help size=${size}></sp-icon-help>` },
  { name: "Help outline", tag: "<sp-icon-help-outline>", story: (size) => html`<sp-icon-help-outline size=${size}></sp-icon-help-outline>` },
  { name: "Histogram", tag: "<sp-icon-histogram>", story: (size) => html`<sp-icon-histogram size=${size}></sp-icon-histogram>` },
  { name: "History", tag: "<sp-icon-history>", story: (size) => html`<sp-icon-history size=${size}></sp-icon-history>` },
  { name: "Home", tag: "<sp-icon-home>", story: (size) => html`<sp-icon-home size=${size}></sp-icon-home>` },
  { name: "Homepage", tag: "<sp-icon-homepage>", story: (size) => html`<sp-icon-homepage size=${size}></sp-icon-homepage>` },
  { name: "Hot fixes", tag: "<sp-icon-hot-fixes>", story: (size) => html`<sp-icon-hot-fixes size=${size}></sp-icon-hot-fixes>` },
  { name: "Hotel bed", tag: "<sp-icon-hotel-bed>", story: (size) => html`<sp-icon-hotel-bed size=${size}></sp-icon-hotel-bed>` },
  { name: "Identity service", tag: "<sp-icon-identity-service>", story: (size) => html`<sp-icon-identity-service size=${size}></sp-icon-identity-service>` },
  { name: "Image", tag: "<sp-icon-image>", story: (size) => html`<sp-icon-image size=${size}></sp-icon-image>` },
  { name: "Image add", tag: "<sp-icon-image-add>", story: (size) => html`<sp-icon-image-add size=${size}></sp-icon-image-add>` },
  { name: "Image album", tag: "<sp-icon-image-album>", story: (size) => html`<sp-icon-image-album size=${size}></sp-icon-image-album>` },
  { name: "Image auto mode", tag: "<sp-icon-image-auto-mode>", story: (size) => html`<sp-icon-image-auto-mode size=${size}></sp-icon-image-auto-mode>` },
  { name: "Image carousel", tag: "<sp-icon-image-carousel>", story: (size) => html`<sp-icon-image-carousel size=${size}></sp-icon-image-carousel>` },
  { name: "Image check", tag: "<sp-icon-image-check>", story: (size) => html`<sp-icon-image-check size=${size}></sp-icon-image-check>` },
  { name: "Image checked out", tag: "<sp-icon-image-checked-out>", story: (size) => html`<sp-icon-image-checked-out size=${size}></sp-icon-image-checked-out>` },
  { name: "Image map circle", tag: "<sp-icon-image-map-circle>", story: (size) => html`<sp-icon-image-map-circle size=${size}></sp-icon-image-map-circle>` },
  { name: "Image map polygon", tag: "<sp-icon-image-map-polygon>", story: (size) => html`<sp-icon-image-map-polygon size=${size}></sp-icon-image-map-polygon>` },
  { name: "Image map rectangle", tag: "<sp-icon-image-map-rectangle>", story: (size) => html`<sp-icon-image-map-rectangle size=${size}></sp-icon-image-map-rectangle>` },
  { name: "Image next", tag: "<sp-icon-image-next>", story: (size) => html`<sp-icon-image-next size=${size}></sp-icon-image-next>` },
  { name: "Image profile", tag: "<sp-icon-image-profile>", story: (size) => html`<sp-icon-image-profile size=${size}></sp-icon-image-profile>` },
  { name: "Image search", tag: "<sp-icon-image-search>", story: (size) => html`<sp-icon-image-search size=${size}></sp-icon-image-search>` },
  { name: "Image text", tag: "<sp-icon-image-text>", story: (size) => html`<sp-icon-image-text size=${size}></sp-icon-image-text>` },
  { name: "Images", tag: "<sp-icon-images>", story: (size) => html`<sp-icon-images size=${size}></sp-icon-images>` },
  { name: "Import", tag: "<sp-icon-import>", story: (size) => html`<sp-icon-import size=${size}></sp-icon-import>` },
  { name: "Inbox", tag: "<sp-icon-inbox>", story: (size) => html`<sp-icon-inbox size=${size}></sp-icon-inbox>` },
  { name: "Individual", tag: "<sp-icon-individual>", story: (size) => html`<sp-icon-individual size=${size}></sp-icon-individual>` },
  { name: "Info", tag: "<sp-icon-info>", story: (size) => html`<sp-icon-info size=${size}></sp-icon-info>` },
  { name: "Info outline", tag: "<sp-icon-info-outline>", story: (size) => html`<sp-icon-info-outline size=${size}></sp-icon-info-outline>` },
  { name: "Intersect overlap", tag: "<sp-icon-intersect-overlap>", story: (size) => html`<sp-icon-intersect-overlap size=${size}></sp-icon-intersect-overlap>` },
  { name: "Invert adj", tag: "<sp-icon-invert-adj>", story: (size) => html`<sp-icon-invert-adj size=${size}></sp-icon-invert-adj>` },
  { name: "Invite", tag: "<sp-icon-invite>", story: (size) => html`<sp-icon-invite size=${size}></sp-icon-invite>` },
  { name: "Journey", tag: "<sp-icon-journey>", story: (size) => html`<sp-icon-journey size=${size}></sp-icon-journey>` },
  { name: "Journey action", tag: "<sp-icon-journey-action>", story: (size) => html`<sp-icon-journey-action size=${size}></sp-icon-journey-action>` },
  { name: "Journey data", tag: "<sp-icon-journey-data>", story: (size) => html`<sp-icon-journey-data size=${size}></sp-icon-journey-data>` },
  { name: "Journey event", tag: "<sp-icon-journey-event>", story: (size) => html`<sp-icon-journey-event size=${size}></sp-icon-journey-event>` },
  { name: "Journey event2", tag: "<sp-icon-journey-event2>", story: (size) => html`<sp-icon-journey-event2 size=${size}></sp-icon-journey-event2>` },
  { name: "Journey reports", tag: "<sp-icon-journey-reports>", story: (size) => html`<sp-icon-journey-reports size=${size}></sp-icon-journey-reports>` },
  { name: "Journey voyager", tag: "<sp-icon-journey-voyager>", story: (size) => html`<sp-icon-journey-voyager size=${size}></sp-icon-journey-voyager>` },
  { name: "Jump to top", tag: "<sp-icon-jump-to-top>", story: (size) => html`<sp-icon-jump-to-top size=${size}></sp-icon-jump-to-top>` },
  { name: "Key", tag: "<sp-icon-key>", story: (size) => html`<sp-icon-key size=${size}></sp-icon-key>` },
  { name: "Key clock", tag: "<sp-icon-key-clock>", story: (size) => html`<sp-icon-key-clock size=${size}></sp-icon-key-clock>` },
  { name: "Key exclude", tag: "<sp-icon-key-exclude>", story: (size) => html`<sp-icon-key-exclude size=${size}></sp-icon-key-exclude>` },
  { name: "Keyboard", tag: "<sp-icon-keyboard>", story: (size) => html`<sp-icon-keyboard size=${size}></sp-icon-keyboard>` },
  { name: "Label", tag: "<sp-icon-label>", story: (size) => html`<sp-icon-label size=${size}></sp-icon-label>` },
  { name: "Label exclude", tag: "<sp-icon-label-exclude>", story: (size) => html`<sp-icon-label-exclude size=${size}></sp-icon-label-exclude>` },
  { name: "Labels", tag: "<sp-icon-labels>", story: (size) => html`<sp-icon-labels size=${size}></sp-icon-labels>` },
  { name: "Landscape", tag: "<sp-icon-landscape>", story: (size) => html`<sp-icon-landscape size=${size}></sp-icon-landscape>` },
  { name: "Launch", tag: "<sp-icon-launch>", story: (size) => html`<sp-icon-launch size=${size}></sp-icon-launch>` },
  { name: "Layers", tag: "<sp-icon-layers>", story: (size) => html`<sp-icon-layers size=${size}></sp-icon-layers>` },
  { name: "Layers backward", tag: "<sp-icon-layers-backward>", story: (size) => html`<sp-icon-layers-backward size=${size}></sp-icon-layers-backward>` },
  { name: "Layers bring to front", tag: "<sp-icon-layers-bring-to-front>", story: (size) => html`<sp-icon-layers-bring-to-front size=${size}></sp-icon-layers-bring-to-front>` },
  { name: "Layers forward", tag: "<sp-icon-layers-forward>", story: (size) => html`<sp-icon-layers-forward size=${size}></sp-icon-layers-forward>` },
  { name: "Layers send to back", tag: "<sp-icon-layers-send-to-back>", story: (size) => html`<sp-icon-layers-send-to-back size=${size}></sp-icon-layers-send-to-back>` },
  { name: "Learn", tag: "<sp-icon-learn>", story: (size) => html`<sp-icon-learn size=${size}></sp-icon-learn>` },
  { name: "Light", tag: "<sp-icon-light>", story: (size) => html`<sp-icon-light size=${size}></sp-icon-light>` },
  { name: "Line", tag: "<sp-icon-line>", story: (size) => html`<sp-icon-line size=${size}></sp-icon-line>` },
  { name: "Line height", tag: "<sp-icon-line-height>", story: (size) => html`<sp-icon-line-height size=${size}></sp-icon-line-height>` },
  { name: "Linear gradient", tag: "<sp-icon-linear-gradient>", story: (size) => html`<sp-icon-linear-gradient size=${size}></sp-icon-linear-gradient>` },
  { name: "Link", tag: "<sp-icon-link>", story: (size) => html`<sp-icon-link size=${size}></sp-icon-link>` },
  { name: "Link check", tag: "<sp-icon-link-check>", story: (size) => html`<sp-icon-link-check size=${size}></sp-icon-link-check>` },
  { name: "Link globe", tag: "<sp-icon-link-globe>", story: (size) => html`<sp-icon-link-globe size=${size}></sp-icon-link-globe>` },
  { name: "Link nav", tag: "<sp-icon-link-nav>", story: (size) => html`<sp-icon-link-nav size=${size}></sp-icon-link-nav>` },
  { name: "Link off", tag: "<sp-icon-link-off>", story: (size) => html`<sp-icon-link-off size=${size}></sp-icon-link-off>` },
  { name: "Link out", tag: "<sp-icon-link-out>", story: (size) => html`<sp-icon-link-out size=${size}></sp-icon-link-out>` },
  { name: "Link out light", tag: "<sp-icon-link-out-light>", story: (size) => html`<sp-icon-link-out-light size=${size}></sp-icon-link-out-light>` },
  { name: "Link page", tag: "<sp-icon-link-page>", story: (size) => html`<sp-icon-link-page size=${size}></sp-icon-link-page>` },
  { name: "Link user", tag: "<sp-icon-link-user>", story: (size) => html`<sp-icon-link-user size=${size}></sp-icon-link-user>` },
  { name: "Location", tag: "<sp-icon-location>", story: (size) => html`<sp-icon-location size=${size}></sp-icon-location>` },
  { name: "Location based date", tag: "<sp-icon-location-based-date>", story: (size) => html`<sp-icon-location-based-date size=${size}></sp-icon-location-based-date>` },
  { name: "Location based event", tag: "<sp-icon-location-based-event>", story: (size) => html`<sp-icon-location-based-event size=${size}></sp-icon-location-based-event>` },
  { name: "Location contribution", tag: "<sp-icon-location-contribution>", story: (size) => html`<sp-icon-location-contribution size=${size}></sp-icon-location-contribution>` },
  { name: "Lock closed", tag: "<sp-icon-lock-closed>", story: (size) => html`<sp-icon-lock-closed size=${size}></sp-icon-lock-closed>` },
  { name: "Lock open", tag: "<sp-icon-lock-open>", story: (size) => html`<sp-icon-lock-open size=${size}></sp-icon-lock-open>` },
  { name: "Log out", tag: "<sp-icon-log-out>", story: (size) => html`<sp-icon-log-out size=${size}></sp-icon-log-out>` },
  { name: "Login", tag: "<sp-icon-login>", story: (size) => html`<sp-icon-login size=${size}></sp-icon-login>` },
  { name: "Looks", tag: "<sp-icon-looks>", story: (size) => html`<sp-icon-looks size=${size}></sp-icon-looks>` },
  { name: "Loupe view", tag: "<sp-icon-loupe-view>", story: (size) => html`<sp-icon-loupe-view size=${size}></sp-icon-loupe-view>` },
  { name: "Mbox", tag: "<sp-icon-mbox>", story: (size) => html`<sp-icon-mbox size=${size}></sp-icon-mbox>` },
  { name: "Magic wand", tag: "<sp-icon-magic-wand>", story: (size) => html`<sp-icon-magic-wand size=${size}></sp-icon-magic-wand>` },
  { name: "Magnify", tag: "<sp-icon-magnify>", story: (size) => html`<sp-icon-magnify size=${size}></sp-icon-magnify>` },
  { name: "Mailbox", tag: "<sp-icon-mailbox>", story: (size) => html`<sp-icon-mailbox size=${size}></sp-icon-mailbox>` },
  { name: "Map view", tag: "<sp-icon-map-view>", story: (size) => html`<sp-icon-map-view size=${size}></sp-icon-map-view>` },
  { name: "Margin bottom", tag: "<sp-icon-margin-bottom>", story: (size) => html`<sp-icon-margin-bottom size=${size}></sp-icon-margin-bottom>` },
  { name: "Margin left", tag: "<sp-icon-margin-left>", story: (size) => html`<sp-icon-margin-left size=${size}></sp-icon-margin-left>` },
  { name: "Margin right", tag: "<sp-icon-margin-right>", story: (size) => html`<sp-icon-margin-right size=${size}></sp-icon-margin-right>` },
  { name: "Margin top", tag: "<sp-icon-margin-top>", story: (size) => html`<sp-icon-margin-top size=${size}></sp-icon-margin-top>` },
  { name: "Marketing activities", tag: "<sp-icon-marketing-activities>", story: (size) => html`<sp-icon-marketing-activities size=${size}></sp-icon-marketing-activities>` },
  { name: "Maximize", tag: "<sp-icon-maximize>", story: (size) => html`<sp-icon-maximize size=${size}></sp-icon-maximize>` },
  { name: "Measure", tag: "<sp-icon-measure>", story: (size) => html`<sp-icon-measure size=${size}></sp-icon-measure>` },
  { name: "Menu", tag: "<sp-icon-menu>", story: (size) => html`<sp-icon-menu size=${size}></sp-icon-menu>` },
  { name: "Merge", tag: "<sp-icon-merge>", story: (size) => html`<sp-icon-merge size=${size}></sp-icon-merge>` },
  { name: "Merge layers", tag: "<sp-icon-merge-layers>", story: (size) => html`<sp-icon-merge-layers size=${size}></sp-icon-merge-layers>` },
  { name: "Messenger", tag: "<sp-icon-messenger>", story: (size) => html`<sp-icon-messenger size=${size}></sp-icon-messenger>` },
  { name: "Minimize", tag: "<sp-icon-minimize>", story: (size) => html`<sp-icon-minimize size=${size}></sp-icon-minimize>` },
  { name: "Mobile services", tag: "<sp-icon-mobile-services>", story: (size) => html`<sp-icon-mobile-services size=${size}></sp-icon-mobile-services>` },
  { name: "Modern grid view", tag: "<sp-icon-modern-grid-view>", story: (size) => html`<sp-icon-modern-grid-view size=${size}></sp-icon-modern-grid-view>` },
  { name: "Money", tag: "<sp-icon-money>", story: (size) => html`<sp-icon-money size=${size}></sp-icon-money>` },
  { name: "Monitoring", tag: "<sp-icon-monitoring>", story: (size) => html`<sp-icon-monitoring size=${size}></sp-icon-monitoring>` },
  { name: "Moon", tag: "<sp-icon-moon>", story: (size) => html`<sp-icon-moon size=${size}></sp-icon-moon>` },
  { name: "More", tag: "<sp-icon-more>", story: (size) => html`<sp-icon-more size=${size}></sp-icon-more>` },
  { name: "More circle", tag: "<sp-icon-more-circle>", story: (size) => html`<sp-icon-more-circle size=${size}></sp-icon-more-circle>` },
  { name: "More small", tag: "<sp-icon-more-small>", story: (size) => html`<sp-icon-more-small size=${size}></sp-icon-more-small>` },
  { name: "More small list", tag: "<sp-icon-more-small-list>", story: (size) => html`<sp-icon-more-small-list size=${size}></sp-icon-more-small-list>` },
  { name: "More small list vert", tag: "<sp-icon-more-small-list-vert>", story: (size) => html`<sp-icon-more-small-list-vert size=${size}></sp-icon-more-small-list-vert>` },
  { name: "More vertical", tag: "<sp-icon-more-vertical>", story: (size) => html`<sp-icon-more-vertical size=${size}></sp-icon-more-vertical>` },
  { name: "Move", tag: "<sp-icon-move>", story: (size) => html`<sp-icon-move size=${size}></sp-icon-move>` },
  { name: "Move left right", tag: "<sp-icon-move-left-right>", story: (size) => html`<sp-icon-move-left-right size=${size}></sp-icon-move-left-right>` },
  { name: "Move to", tag: "<sp-icon-move-to>", story: (size) => html`<sp-icon-move-to size=${size}></sp-icon-move-to>` },
  { name: "Move up down", tag: "<sp-icon-move-up-down>", story: (size) => html`<sp-icon-move-up-down size=${size}></sp-icon-move-up-down>` },
  { name: "Movie camera", tag: "<sp-icon-movie-camera>", story: (size) => html`<sp-icon-movie-camera size=${size}></sp-icon-movie-camera>` },
  { name: "Multiple", tag: "<sp-icon-multiple>", story: (size) => html`<sp-icon-multiple size=${size}></sp-icon-multiple>` },
  { name: "Multiple add", tag: "<sp-icon-multiple-add>", story: (size) => html`<sp-icon-multiple-add size=${size}></sp-icon-multiple-add>` },
  { name: "Multiple check", tag: "<sp-icon-multiple-check>", story: (size) => html`<sp-icon-multiple-check size=${size}></sp-icon-multiple-check>` },
  { name: "Multiple exclude", tag: "<sp-icon-multiple-exclude>", story: (size) => html`<sp-icon-multiple-exclude size=${size}></sp-icon-multiple-exclude>` },
  { name: "Naming order", tag: "<sp-icon-naming-order>", story: (size) => html`<sp-icon-naming-order size=${size}></sp-icon-naming-order>` },
  { name: "New item", tag: "<sp-icon-new-item>", story: (size) => html`<sp-icon-new-item size=${size}></sp-icon-new-item>` },
  { name: "News", tag: "<sp-icon-news>", story: (size) => html`<sp-icon-news size=${size}></sp-icon-news>` },
  { name: "News add", tag: "<sp-icon-news-add>", story: (size) => html`<sp-icon-news-add size=${size}></sp-icon-news-add>` },
  { name: "No edit", tag: "<sp-icon-no-edit>", story: (size) => html`<sp-icon-no-edit size=${size}></sp-icon-no-edit>` },
  { name: "Note", tag: "<sp-icon-note>", story: (size) => html`<sp-icon-note size=${size}></sp-icon-note>` },
  { name: "Note add", tag: "<sp-icon-note-add>", story: (size) => html`<sp-icon-note-add size=${size}></sp-icon-note-add>` },
  { name: "Os", tag: "<sp-icon-os>", story: (size) => html`<sp-icon-os size=${size}></sp-icon-os>` },
  { name: "Offer", tag: "<sp-icon-offer>", story: (size) => html`<sp-icon-offer size=${size}></sp-icon-offer>` },
  { name: "Offer activities", tag: "<sp-icon-offer-activities>", story: (size) => html`<sp-icon-offer-activities size=${size}></sp-icon-offer-activities>` },
  { name: "Offer delete", tag: "<sp-icon-offer-delete>", story: (size) => html`<sp-icon-offer-delete size=${size}></sp-icon-offer-delete>` },
  { name: "Offers", tag: "<sp-icon-offers>", story: (size) => html`<sp-icon-offers size=${size}></sp-icon-offers>` },
  { name: "On air", tag: "<sp-icon-on-air>", story: (size) => html`<sp-icon-on-air size=${size}></sp-icon-on-air>` },
  { name: "Open in", tag: "<sp-icon-open-in>", story: (size) => html`<sp-icon-open-in size=${size}></sp-icon-open-in>` },
  { name: "Open in light", tag: "<sp-icon-open-in-light>", story: (size) => html`<sp-icon-open-in-light size=${size}></sp-icon-open-in-light>` },
  { name: "Open recent", tag: "<sp-icon-open-recent>", story: (size) => html`<sp-icon-open-recent size=${size}></sp-icon-open-recent>` },
  { name: "Open recent outline", tag: "<sp-icon-open-recent-outline>", story: (size) => html`<sp-icon-open-recent-outline size=${size}></sp-icon-open-recent-outline>` },
  { name: "Orbit", tag: "<sp-icon-orbit>", story: (size) => html`<sp-icon-orbit size=${size}></sp-icon-orbit>` },
  { name: "Organisations", tag: "<sp-icon-organisations>", story: (size) => html`<sp-icon-organisations size=${size}></sp-icon-organisations>` },
  { name: "Organize", tag: "<sp-icon-organize>", story: (size) => html`<sp-icon-organize size=${size}></sp-icon-organize>` },
  { name: "Outline path", tag: "<sp-icon-outline-path>", story: (size) => html`<sp-icon-outline-path size=${size}></sp-icon-outline-path>` },
  { name: "Padding bottom", tag: "<sp-icon-padding-bottom>", story: (size) => html`<sp-icon-padding-bottom size=${size}></sp-icon-padding-bottom>` },
  { name: "Padding left", tag: "<sp-icon-padding-left>", story: (size) => html`<sp-icon-padding-left size=${size}></sp-icon-padding-left>` },
  { name: "Padding right", tag: "<sp-icon-padding-right>", story: (size) => html`<sp-icon-padding-right size=${size}></sp-icon-padding-right>` },
  { name: "Padding top", tag: "<sp-icon-padding-top>", story: (size) => html`<sp-icon-padding-top size=${size}></sp-icon-padding-top>` },
  { name: "Page break", tag: "<sp-icon-page-break>", story: (size) => html`<sp-icon-page-break size=${size}></sp-icon-page-break>` },
  { name: "Page exclude", tag: "<sp-icon-page-exclude>", story: (size) => html`<sp-icon-page-exclude size=${size}></sp-icon-page-exclude>` },
  { name: "Page gear", tag: "<sp-icon-page-gear>", story: (size) => html`<sp-icon-page-gear size=${size}></sp-icon-page-gear>` },
  { name: "Page rule", tag: "<sp-icon-page-rule>", story: (size) => html`<sp-icon-page-rule size=${size}></sp-icon-page-rule>` },
  { name: "Page share", tag: "<sp-icon-page-share>", story: (size) => html`<sp-icon-page-share size=${size}></sp-icon-page-share>` },
  { name: "Page tag", tag: "<sp-icon-page-tag>", story: (size) => html`<sp-icon-page-tag size=${size}></sp-icon-page-tag>` },
  { name: "Pages exclude", tag: "<sp-icon-pages-exclude>", story: (size) => html`<sp-icon-pages-exclude size=${size}></sp-icon-pages-exclude>` },
  { name: "Pan", tag: "<sp-icon-pan>", story: (size) => html`<sp-icon-pan size=${size}></sp-icon-pan>` },
  { name: "Panel", tag: "<sp-icon-panel>", story: (size) => html`<sp-icon-panel size=${size}></sp-icon-panel>` },
  { name: "Paste", tag: "<sp-icon-paste>", story: (size) => html`<sp-icon-paste size=${size}></sp-icon-paste>` },
  { name: "Paste htm l", tag: "<sp-icon-paste-htm-l>", story: (size) => html`<sp-icon-paste-htm-l size=${size}></sp-icon-paste-htm-l>` },
  { name: "Paste list", tag: "<sp-icon-paste-list>", story: (size) => html`<sp-icon-paste-list size=${size}></sp-icon-paste-list>` },
  { name: "Paste text", tag: "<sp-icon-paste-text>", story: (size) => html`<sp-icon-paste-text size=${size}></sp-icon-paste-text>` },
  { name: "Pattern", tag: "<sp-icon-pattern>", story: (size) => html`<sp-icon-pattern size=${size}></sp-icon-pattern>` },
  { name: "Pause", tag: "<sp-icon-pause>", story: (size) => html`<sp-icon-pause size=${size}></sp-icon-pause>` },
  { name: "Pause circle", tag: "<sp-icon-pause-circle>", story: (size) => html`<sp-icon-pause-circle size=${size}></sp-icon-pause-circle>` },
  { name: "Pawn", tag: "<sp-icon-pawn>", story: (size) => html`<sp-icon-pawn size=${size}></sp-icon-pawn>` },
  { name: "Pending", tag: "<sp-icon-pending>", story: (size) => html`<sp-icon-pending size=${size}></sp-icon-pending>` },
  { name: "People group", tag: "<sp-icon-people-group>", story: (size) => html`<sp-icon-people-group size=${size}></sp-icon-people-group>` },
  { name: "Personalization field", tag: "<sp-icon-personalization-field>", story: (size) => html`<sp-icon-personalization-field size=${size}></sp-icon-personalization-field>` },
  { name: "Perspective", tag: "<sp-icon-perspective>", story: (size) => html`<sp-icon-perspective size=${size}></sp-icon-perspective>` },
  { name: "Pin off", tag: "<sp-icon-pin-off>", story: (size) => html`<sp-icon-pin-off size=${size}></sp-icon-pin-off>` },
  { name: "Pin on", tag: "<sp-icon-pin-on>", story: (size) => html`<sp-icon-pin-on size=${size}></sp-icon-pin-on>` },
  { name: "Pivot", tag: "<sp-icon-pivot>", story: (size) => html`<sp-icon-pivot size=${size}></sp-icon-pivot>` },
  { name: "Placeholder", tag: "<sp-icon-placeholder>", story: (size) => html`<sp-icon-placeholder size=${size}></sp-icon-placeholder>` },
  { name: "Platform data mapping", tag: "<sp-icon-platform-data-mapping>", story: (size) => html`<sp-icon-platform-data-mapping size=${size}></sp-icon-platform-data-mapping>` },
  { name: "Play", tag: "<sp-icon-play>", story: (size) => html`<sp-icon-play size=${size}></sp-icon-play>` },
  { name: "Play circle", tag: "<sp-icon-play-circle>", story: (size) => html`<sp-icon-play-circle size=${size}></sp-icon-play-circle>` },
  { name: "Plug", tag: "<sp-icon-plug>", story: (size) => html`<sp-icon-plug size=${size}></sp-icon-plug>` },
  { name: "Polygon", tag: "<sp-icon-polygon>", story: (size) => html`<sp-icon-polygon size=${size}></sp-icon-polygon>` },
  { name: "Polygon select", tag: "<sp-icon-polygon-select>", story: (size) => html`<sp-icon-polygon-select size=${size}></sp-icon-polygon-select>` },
  { name: "Pop in", tag: "<sp-icon-pop-in>", story: (size) => html`<sp-icon-pop-in size=${size}></sp-icon-pop-in>` },
  { name: "Portrait", tag: "<sp-icon-portrait>", story: (size) => html`<sp-icon-portrait size=${size}></sp-icon-portrait>` },
  { name: "Preset", tag: "<sp-icon-preset>", story: (size) => html`<sp-icon-preset size=${size}></sp-icon-preset>` },
  { name: "Preview", tag: "<sp-icon-preview>", story: (size) => html`<sp-icon-preview size=${size}></sp-icon-preview>` },
  { name: "Print", tag: "<sp-icon-print>", story: (size) => html`<sp-icon-print size=${size}></sp-icon-print>` },
  { name: "Print preview", tag: "<sp-icon-print-preview>", story: (size) => html`<sp-icon-print-preview size=${size}></sp-icon-print-preview>` },
  { name: "Project", tag: "<sp-icon-project>", story: (size) => html`<sp-icon-project size=${size}></sp-icon-project>` },
  { name: "Project add", tag: "<sp-icon-project-add>", story: (size) => html`<sp-icon-project-add size=${size}></sp-icon-project-add>` },
  { name: "Project edit", tag: "<sp-icon-project-edit>", story: (size) => html`<sp-icon-project-edit size=${size}></sp-icon-project-edit>` },
  { name: "Project name edit", tag: "<sp-icon-project-name-edit>", story: (size) => html`<sp-icon-project-name-edit size=${size}></sp-icon-project-name-edit>` },
  { name: "Promote", tag: "<sp-icon-promote>", story: (size) => html`<sp-icon-promote size=${size}></sp-icon-promote>` },
  { name: "Properties", tag: "<sp-icon-properties>", story: (size) => html`<sp-icon-properties size=${size}></sp-icon-properties>` },
  { name: "Properties copy", tag: "<sp-icon-properties-copy>", story: (size) => html`<sp-icon-properties-copy size=${size}></sp-icon-properties-copy>` },
  { name: "Publish check", tag: "<sp-icon-publish-check>", story: (size) => html`<sp-icon-publish-check size=${size}></sp-icon-publish-check>` },
  { name: "Publish pending", tag: "<sp-icon-publish-pending>", story: (size) => html`<sp-icon-publish-pending size=${size}></sp-icon-publish-pending>` },
  { name: "Publish reject", tag: "<sp-icon-publish-reject>", story: (size) => html`<sp-icon-publish-reject size=${size}></sp-icon-publish-reject>` },
  { name: "Publish remove", tag: "<sp-icon-publish-remove>", story: (size) => html`<sp-icon-publish-remove size=${size}></sp-icon-publish-remove>` },
  { name: "Publish schedule", tag: "<sp-icon-publish-schedule>", story: (size) => html`<sp-icon-publish-schedule size=${size}></sp-icon-publish-schedule>` },
  { name: "Push notification", tag: "<sp-icon-push-notification>", story: (size) => html`<sp-icon-push-notification size=${size}></sp-icon-push-notification>` },
  { name: "Question", tag: "<sp-icon-question>", story: (size) => html`<sp-icon-question size=${size}></sp-icon-question>` },
  { name: "Quick select", tag: "<sp-icon-quick-select>", story: (size) => html`<sp-icon-quick-select size=${size}></sp-icon-quick-select>` },
  { name: "Rss", tag: "<sp-icon-rss>", story: (size) => html`<sp-icon-rss size=${size}></sp-icon-rss>` },
  { name: "Radial gradient", tag: "<sp-icon-radial-gradient>", story: (size) => html`<sp-icon-radial-gradient size=${size}></sp-icon-radial-gradient>` },
  { name: "Rail", tag: "<sp-icon-rail>", story: (size) => html`<sp-icon-rail size=${size}></sp-icon-rail>` },
  { name: "Rail bottom", tag: "<sp-icon-rail-bottom>", story: (size) => html`<sp-icon-rail-bottom size=${size}></sp-icon-rail-bottom>` },
  { name: "Rail left", tag: "<sp-icon-rail-left>", story: (size) => html`<sp-icon-rail-left size=${size}></sp-icon-rail-left>` },
  { name: "Rail right", tag: "<sp-icon-rail-right>", story: (size) => html`<sp-icon-rail-right size=${size}></sp-icon-rail-right>` },
  { name: "Rail right close", tag: "<sp-icon-rail-right-close>", story: (size) => html`<sp-icon-rail-right-close size=${size}></sp-icon-rail-right-close>` },
  { name: "Rail right open", tag: "<sp-icon-rail-right-open>", story: (size) => html`<sp-icon-rail-right-open size=${size}></sp-icon-rail-right-open>` },
  { name: "Rail top", tag: "<sp-icon-rail-top>", story: (size) => html`<sp-icon-rail-top size=${size}></sp-icon-rail-top>` },
  { name: "Range mask", tag: "<sp-icon-range-mask>", story: (size) => html`<sp-icon-range-mask size=${size}></sp-icon-range-mask>` },
  { name: "Real time customer profile", tag: "<sp-icon-real-time-customer-profile>", story: (size) => html`<sp-icon-real-time-customer-profile size=${size}></sp-icon-real-time-customer-profile>` },
  { name: "Rect select", tag: "<sp-icon-rect-select>", story: (size) => html`<sp-icon-rect-select size=${size}></sp-icon-rect-select>` },
  { name: "Rectangle", tag: "<sp-icon-rectangle>", story: (size) => html`<sp-icon-rectangle size=${size}></sp-icon-rectangle>` },
  { name: "Redo", tag: "<sp-icon-redo>", story: (size) => html`<sp-icon-redo size=${size}></sp-icon-redo>` },
  { name: "Refresh", tag: "<sp-icon-refresh>", story: (size) => html`<sp-icon-refresh size=${size}></sp-icon-refresh>` },
  { name: "Region select", tag: "<sp-icon-region-select>", story: (size) => html`<sp-icon-region-select size=${size}></sp-icon-region-select>` },
  { name: "Relevance", tag: "<sp-icon-relevance>", story: (size) => html`<sp-icon-relevance size=${size}></sp-icon-relevance>` },
  { name: "Remove", tag: "<sp-icon-remove>", story: (size) => html`<sp-icon-remove size=${size}></sp-icon-remove>` },
  { name: "Remove circle", tag: "<sp-icon-remove-circle>", story: (size) => html`<sp-icon-remove-circle size=${size}></sp-icon-remove-circle>` },
  { name: "Rename", tag: "<sp-icon-rename>", story: (size) => html`<sp-icon-rename size=${size}></sp-icon-rename>` },
  { name: "Reorder", tag: "<sp-icon-reorder>", story: (size) => html`<sp-icon-reorder size=${size}></sp-icon-reorder>` },
  { name: "Replay", tag: "<sp-icon-replay>", story: (size) => html`<sp-icon-replay size=${size}></sp-icon-replay>` },
  { name: "Replies", tag: "<sp-icon-replies>", story: (size) => html`<sp-icon-replies size=${size}></sp-icon-replies>` },
  { name: "Reply", tag: "<sp-icon-reply>", story: (size) => html`<sp-icon-reply size=${size}></sp-icon-reply>` },
  { name: "Reply all", tag: "<sp-icon-reply-all>", story: (size) => html`<sp-icon-reply-all size=${size}></sp-icon-reply-all>` },
  { name: "Report", tag: "<sp-icon-report>", story: (size) => html`<sp-icon-report size=${size}></sp-icon-report>` },
  { name: "Report add", tag: "<sp-icon-report-add>", story: (size) => html`<sp-icon-report-add size=${size}></sp-icon-report-add>` },
  { name: "Resize", tag: "<sp-icon-resize>", story: (size) => html`<sp-icon-resize size=${size}></sp-icon-resize>` },
  { name: "Resolved comment", tag: "<sp-icon-resolved-comment>", story: (size) => html`<sp-icon-resolved-comment size=${size}></sp-icon-resolved-comment>` },
  { name: "Retweet", tag: "<sp-icon-retweet>", story: (size) => html`<sp-icon-retweet size=${size}></sp-icon-retweet>` },
  { name: "Reuse", tag: "<sp-icon-reuse>", story: (size) => html`<sp-icon-reuse size=${size}></sp-icon-reuse>` },
  { name: "Revenue", tag: "<sp-icon-revenue>", story: (size) => html`<sp-icon-revenue size=${size}></sp-icon-revenue>` },
  { name: "Revert", tag: "<sp-icon-revert>", story: (size) => html`<sp-icon-revert size=${size}></sp-icon-revert>` },
  { name: "Rewind", tag: "<sp-icon-rewind>", story: (size) => html`<sp-icon-rewind size=${size}></sp-icon-rewind>` },
  { name: "Rewind circle", tag: "<sp-icon-rewind-circle>", story: (size) => html`<sp-icon-rewind-circle size=${size}></sp-icon-rewind-circle>` },
  { name: "Ribbon", tag: "<sp-icon-ribbon>", story: (size) => html`<sp-icon-ribbon size=${size}></sp-icon-ribbon>` },
  { name: "Rotate cc w", tag: "<sp-icon-rotate-cc-w>", story: (size) => html`<sp-icon-rotate-cc-w size=${size}></sp-icon-rotate-cc-w>` },
  { name: "Rotate ccw bold", tag: "<sp-icon-rotate-ccw-bold>", story: (size) => html`<sp-icon-rotate-ccw-bold size=${size}></sp-icon-rotate-ccw-bold>` },
  { name: "Rotate c w", tag: "<sp-icon-rotate-c-w>", story: (size) => html`<sp-icon-rotate-c-w size=${size}></sp-icon-rotate-c-w>` },
  { name: "Rotate cw bold", tag: "<sp-icon-rotate-cw-bold>", story: (size) => html`<sp-icon-rotate-cw-bold size=${size}></sp-icon-rotate-cw-bold>` },
  { name: "Rotate left", tag: "<sp-icon-rotate-left>", story: (size) => html`<sp-icon-rotate-left size=${size}></sp-icon-rotate-left>` },
  { name: "Rotate left outline", tag: "<sp-icon-rotate-left-outline>", story: (size) => html`<sp-icon-rotate-left-outline size=${size}></sp-icon-rotate-left-outline>` },
  { name: "Rotate right", tag: "<sp-icon-rotate-right>", story: (size) => html`<sp-icon-rotate-right size=${size}></sp-icon-rotate-right>` },
  { name: "Rotate right outline", tag: "<sp-icon-rotate-right-outline>", story: (size) => html`<sp-icon-rotate-right-outline size=${size}></sp-icon-rotate-right-outline>` },
  { name: "Sms", tag: "<sp-icon-sms>", story: (size) => html`<sp-icon-sms size=${size}></sp-icon-sms>` },
  { name: "Smskey", tag: "<sp-icon-smskey>", story: (size) => html`<sp-icon-smskey size=${size}></sp-icon-smskey>` },
  { name: "Smslightning", tag: "<sp-icon-smslightning>", story: (size) => html`<sp-icon-smslightning size=${size}></sp-icon-smslightning>` },
  { name: "Smsrefresh", tag: "<sp-icon-smsrefresh>", story: (size) => html`<sp-icon-smsrefresh size=${size}></sp-icon-smsrefresh>` },
  { name: "Sqlquery", tag: "<sp-icon-sqlquery>", story: (size) => html`<sp-icon-sqlquery size=${size}></sp-icon-sqlquery>` },
  { name: "Sampler", tag: "<sp-icon-sampler>", story: (size) => html`<sp-icon-sampler size=${size}></sp-icon-sampler>` },
  { name: "Sandbox", tag: "<sp-icon-sandbox>", story: (size) => html`<sp-icon-sandbox size=${size}></sp-icon-sandbox>` },
  { name: "Save as floppy", tag: "<sp-icon-save-as-floppy>", story: (size) => html`<sp-icon-save-as-floppy size=${size}></sp-icon-save-as-floppy>` },
  { name: "Save floppy", tag: "<sp-icon-save-floppy>", story: (size) => html`<sp-icon-save-floppy size=${size}></sp-icon-save-floppy>` },
  { name: "Save to", tag: "<sp-icon-save-to>", story: (size) => html`<sp-icon-save-to size=${size}></sp-icon-save-to>` },
  { name: "Save to light", tag: "<sp-icon-save-to-light>", story: (size) => html`<sp-icon-save-to-light size=${size}></sp-icon-save-to-light>` },
  { name: "Scribble", tag: "<sp-icon-scribble>", story: (size) => html`<sp-icon-scribble size=${size}></sp-icon-scribble>` },
  { name: "Search", tag: "<sp-icon-search>", story: (size) => html`<sp-icon-search size=${size}></sp-icon-search>` },
  { name: "Seat", tag: "<sp-icon-seat>", story: (size) => html`<sp-icon-seat size=${size}></sp-icon-seat>` },
  { name: "Seat add", tag: "<sp-icon-seat-add>", story: (size) => html`<sp-icon-seat-add size=${size}></sp-icon-seat-add>` },
  { name: "Segmentation", tag: "<sp-icon-segmentation>", story: (size) => html`<sp-icon-segmentation size=${size}></sp-icon-segmentation>` },
  { name: "Segments", tag: "<sp-icon-segments>", story: (size) => html`<sp-icon-segments size=${size}></sp-icon-segments>` },
  { name: "Select", tag: "<sp-icon-select>", story: (size) => html`<sp-icon-select size=${size}></sp-icon-select>` },
  { name: "Select add", tag: "<sp-icon-select-add>", story: (size) => html`<sp-icon-select-add size=${size}></sp-icon-select-add>` },
  { name: "Select box", tag: "<sp-icon-select-box>", story: (size) => html`<sp-icon-select-box size=${size}></sp-icon-select-box>` },
  { name: "Select box all", tag: "<sp-icon-select-box-all>", story: (size) => html`<sp-icon-select-box-all size=${size}></sp-icon-select-box-all>` },
  { name: "Select circular", tag: "<sp-icon-select-circular>", story: (size) => html`<sp-icon-select-circular size=${size}></sp-icon-select-circular>` },
  { name: "Select container", tag: "<sp-icon-select-container>", story: (size) => html`<sp-icon-select-container size=${size}></sp-icon-select-container>` },
  { name: "Select gear", tag: "<sp-icon-select-gear>", story: (size) => html`<sp-icon-select-gear size=${size}></sp-icon-select-gear>` },
  { name: "Select intersect", tag: "<sp-icon-select-intersect>", story: (size) => html`<sp-icon-select-intersect size=${size}></sp-icon-select-intersect>` },
  { name: "Select subtract", tag: "<sp-icon-select-subtract>", story: (size) => html`<sp-icon-select-subtract size=${size}></sp-icon-select-subtract>` },
  { name: "Selection", tag: "<sp-icon-selection>", story: (size) => html`<sp-icon-selection size=${size}></sp-icon-selection>` },
  { name: "Selection checked", tag: "<sp-icon-selection-checked>", story: (size) => html`<sp-icon-selection-checked size=${size}></sp-icon-selection-checked>` },
  { name: "Selection move", tag: "<sp-icon-selection-move>", story: (size) => html`<sp-icon-selection-move size=${size}></sp-icon-selection-move>` },
  { name: "Send", tag: "<sp-icon-send>", story: (size) => html`<sp-icon-send size=${size}></sp-icon-send>` },
  { name: "Sentiment negative", tag: "<sp-icon-sentiment-negative>", story: (size) => html`<sp-icon-sentiment-negative size=${size}></sp-icon-sentiment-negative>` },
  { name: "Sentiment neutral", tag: "<sp-icon-sentiment-neutral>", story: (size) => html`<sp-icon-sentiment-neutral size=${size}></sp-icon-sentiment-neutral>` },
  { name: "Sentiment positive", tag: "<sp-icon-sentiment-positive>", story: (size) => html`<sp-icon-sentiment-positive size=${size}></sp-icon-sentiment-positive>` },
  { name: "Separator", tag: "<sp-icon-separator>", story: (size) => html`<sp-icon-separator size=${size}></sp-icon-separator>` },
  { name: "Servers", tag: "<sp-icon-servers>", story: (size) => html`<sp-icon-servers size=${size}></sp-icon-servers>` },
  { name: "Settings", tag: "<sp-icon-settings>", story: (size) => html`<sp-icon-settings size=${size}></sp-icon-settings>` },
  { name: "Shapes", tag: "<sp-icon-shapes>", story: (size) => html`<sp-icon-shapes size=${size}></sp-icon-shapes>` },
  { name: "Share", tag: "<sp-icon-share>", story: (size) => html`<sp-icon-share size=${size}></sp-icon-share>` },
  { name: "Share android", tag: "<sp-icon-share-android>", story: (size) => html`<sp-icon-share-android size=${size}></sp-icon-share-android>` },
  { name: "Share check", tag: "<sp-icon-share-check>", story: (size) => html`<sp-icon-share-check size=${size}></sp-icon-share-check>` },
  { name: "Share light", tag: "<sp-icon-share-light>", story: (size) => html`<sp-icon-share-light size=${size}></sp-icon-share-light>` },
  { name: "Share windows", tag: "<sp-icon-share-windows>", story: (size) => html`<sp-icon-share-windows size=${size}></sp-icon-share-windows>` },
  { name: "Sharpen", tag: "<sp-icon-sharpen>", story: (size) => html`<sp-icon-sharpen size=${size}></sp-icon-sharpen>` },
  { name: "Shield", tag: "<sp-icon-shield>", story: (size) => html`<sp-icon-shield size=${size}></sp-icon-shield>` },
  { name: "Ship", tag: "<sp-icon-ship>", story: (size) => html`<sp-icon-ship size=${size}></sp-icon-ship>` },
  { name: "Shop", tag: "<sp-icon-shop>", story: (size) => html`<sp-icon-shop size=${size}></sp-icon-shop>` },
  { name: "Shopping cart", tag: "<sp-icon-shopping-cart>", story: (size) => html`<sp-icon-shopping-cart size=${size}></sp-icon-shopping-cart>` },
  { name: "Show all layers", tag: "<sp-icon-show-all-layers>", story: (size) => html`<sp-icon-show-all-layers size=${size}></sp-icon-show-all-layers>` },
  { name: "Show menu", tag: "<sp-icon-show-menu>", story: (size) => html`<sp-icon-show-menu size=${size}></sp-icon-show-menu>` },
  { name: "Show one layer", tag: "<sp-icon-show-one-layer>", story: (size) => html`<sp-icon-show-one-layer size=${size}></sp-icon-show-one-layer>` },
  { name: "Shuffle", tag: "<sp-icon-shuffle>", story: (size) => html`<sp-icon-shuffle size=${size}></sp-icon-shuffle>` },
  { name: "Slice", tag: "<sp-icon-slice>", story: (size) => html`<sp-icon-slice size=${size}></sp-icon-slice>` },
  { name: "Slow", tag: "<sp-icon-slow>", story: (size) => html`<sp-icon-slow size=${size}></sp-icon-slow>` },
  { name: "Small caps", tag: "<sp-icon-small-caps>", story: (size) => html`<sp-icon-small-caps size=${size}></sp-icon-small-caps>` },
  { name: "Snapshot", tag: "<sp-icon-snapshot>", story: (size) => html`<sp-icon-snapshot size=${size}></sp-icon-snapshot>` },
  { name: "Social network", tag: "<sp-icon-social-network>", story: (size) => html`<sp-icon-social-network size=${size}></sp-icon-social-network>` },
  { name: "Sort order down", tag: "<sp-icon-sort-order-down>", story: (size) => html`<sp-icon-sort-order-down size=${size}></sp-icon-sort-order-down>` },
  { name: "Sort order up", tag: "<sp-icon-sort-order-up>", story: (size) => html`<sp-icon-sort-order-up size=${size}></sp-icon-sort-order-up>` },
  { name: "Spam", tag: "<sp-icon-spam>", story: (size) => html`<sp-icon-spam size=${size}></sp-icon-spam>` },
  { name: "Spellcheck", tag: "<sp-icon-spellcheck>", story: (size) => html`<sp-icon-spellcheck size=${size}></sp-icon-spellcheck>` },
  { name: "Spin", tag: "<sp-icon-spin>", story: (size) => html`<sp-icon-spin size=${size}></sp-icon-spin>` },
  { name: "Split view", tag: "<sp-icon-split-view>", story: (size) => html`<sp-icon-split-view size=${size}></sp-icon-split-view>` },
  { name: "Spot heal", tag: "<sp-icon-spot-heal>", story: (size) => html`<sp-icon-spot-heal size=${size}></sp-icon-spot-heal>` },
  { name: "Stadium", tag: "<sp-icon-stadium>", story: (size) => html`<sp-icon-stadium size=${size}></sp-icon-stadium>` },
  { name: "Stage", tag: "<sp-icon-stage>", story: (size) => html`<sp-icon-stage size=${size}></sp-icon-stage>` },
  { name: "Stamp", tag: "<sp-icon-stamp>", story: (size) => html`<sp-icon-stamp size=${size}></sp-icon-stamp>` },
  { name: "Star", tag: "<sp-icon-star>", story: (size) => html`<sp-icon-star size=${size}></sp-icon-star>` },
  { name: "Star outline", tag: "<sp-icon-star-outline>", story: (size) => html`<sp-icon-star-outline size=${size}></sp-icon-star-outline>` },
  { name: "Starburst", tag: "<sp-icon-starburst>", story: (size) => html`<sp-icon-starburst size=${size}></sp-icon-starburst>` },
  { name: "Step backward", tag: "<sp-icon-step-backward>", story: (size) => html`<sp-icon-step-backward size=${size}></sp-icon-step-backward>` },
  { name: "Step backward circle", tag: "<sp-icon-step-backward-circle>", story: (size) => html`<sp-icon-step-backward-circle size=${size}></sp-icon-step-backward-circle>` },
  { name: "Step forward", tag: "<sp-icon-step-forward>", story: (size) => html`<sp-icon-step-forward size=${size}></sp-icon-step-forward>` },
  { name: "Step forward circle", tag: "<sp-icon-step-forward-circle>", story: (size) => html`<sp-icon-step-forward-circle size=${size}></sp-icon-step-forward-circle>` },
  { name: "Stop", tag: "<sp-icon-stop>", story: (size) => html`<sp-icon-stop size=${size}></sp-icon-stop>` },
  { name: "Stop circle", tag: "<sp-icon-stop-circle>", story: (size) => html`<sp-icon-stop-circle size=${size}></sp-icon-stop-circle>` },
  { name: "Stopwatch", tag: "<sp-icon-stopwatch>", story: (size) => html`<sp-icon-stopwatch size=${size}></sp-icon-stopwatch>` },
  { name: "Straighten", tag: "<sp-icon-straighten>", story: (size) => html`<sp-icon-straighten size=${size}></sp-icon-straighten>` },
  { name: "Straighten outline", tag: "<sp-icon-straighten-outline>", story: (size) => html`<sp-icon-straighten-outline size=${size}></sp-icon-straighten-outline>` },
  { name: "Stroke width", tag: "<sp-icon-stroke-width>", story: (size) => html`<sp-icon-stroke-width size=${size}></sp-icon-stroke-width>` },
  { name: "Subscribe", tag: "<sp-icon-subscribe>", story: (size) => html`<sp-icon-subscribe size=${size}></sp-icon-subscribe>` },
  { name: "Subtract back path", tag: "<sp-icon-subtract-back-path>", story: (size) => html`<sp-icon-subtract-back-path size=${size}></sp-icon-subtract-back-path>` },
  { name: "Subtract from selection", tag: "<sp-icon-subtract-from-selection>", story: (size) => html`<sp-icon-subtract-from-selection size=${size}></sp-icon-subtract-from-selection>` },
  { name: "Subtract front path", tag: "<sp-icon-subtract-front-path>", story: (size) => html`<sp-icon-subtract-front-path size=${size}></sp-icon-subtract-front-path>` },
  { name: "Success metric", tag: "<sp-icon-success-metric>", story: (size) => html`<sp-icon-success-metric size=${size}></sp-icon-success-metric>` },
  { name: "Summarize", tag: "<sp-icon-summarize>", story: (size) => html`<sp-icon-summarize size=${size}></sp-icon-summarize>` },
  { name: "Survey", tag: "<sp-icon-survey>", story: (size) => html`<sp-icon-survey size=${size}></sp-icon-survey>` },
  { name: "Switch", tag: "<sp-icon-switch>", story: (size) => html`<sp-icon-switch size=${size}></sp-icon-switch>` },
  { name: "Sync", tag: "<sp-icon-sync>", story: (size) => html`<sp-icon-sync size=${size}></sp-icon-sync>` },
  { name: "Sync remove", tag: "<sp-icon-sync-remove>", story: (size) => html`<sp-icon-sync-remove size=${size}></sp-icon-sync-remove>` },
  { name: "Table", tag: "<sp-icon-table>", story: (size) => html`<sp-icon-table size=${size}></sp-icon-table>` },
  { name: "Table add", tag: "<sp-icon-table-add>", story: (size) => html`<sp-icon-table-add size=${size}></sp-icon-table-add>` },
  { name: "Table and chart", tag: "<sp-icon-table-and-chart>", story: (size) => html`<sp-icon-table-and-chart size=${size}></sp-icon-table-and-chart>` },
  { name: "Table column add left", tag: "<sp-icon-table-column-add-left>", story: (size) => html`<sp-icon-table-column-add-left size=${size}></sp-icon-table-column-add-left>` },
  { name: "Table column add right", tag: "<sp-icon-table-column-add-right>", story: (size) => html`<sp-icon-table-column-add-right size=${size}></sp-icon-table-column-add-right>` },
  { name: "Table column merge", tag: "<sp-icon-table-column-merge>", story: (size) => html`<sp-icon-table-column-merge size=${size}></sp-icon-table-column-merge>` },
  { name: "Table column remove center", tag: "<sp-icon-table-column-remove-center>", story: (size) => html`<sp-icon-table-column-remove-center size=${size}></sp-icon-table-column-remove-center>` },
  { name: "Table column split", tag: "<sp-icon-table-column-split>", story: (size) => html`<sp-icon-table-column-split size=${size}></sp-icon-table-column-split>` },
  { name: "Table edit", tag: "<sp-icon-table-edit>", story: (size) => html`<sp-icon-table-edit size=${size}></sp-icon-table-edit>` },
  { name: "Table histogram", tag: "<sp-icon-table-histogram>", story: (size) => html`<sp-icon-table-histogram size=${size}></sp-icon-table-histogram>` },
  { name: "Table merge cells", tag: "<sp-icon-table-merge-cells>", story: (size) => html`<sp-icon-table-merge-cells size=${size}></sp-icon-table-merge-cells>` },
  { name: "Table row add bottom", tag: "<sp-icon-table-row-add-bottom>", story: (size) => html`<sp-icon-table-row-add-bottom size=${size}></sp-icon-table-row-add-bottom>` },
  { name: "Table row add top", tag: "<sp-icon-table-row-add-top>", story: (size) => html`<sp-icon-table-row-add-top size=${size}></sp-icon-table-row-add-top>` },
  { name: "Table row merge", tag: "<sp-icon-table-row-merge>", story: (size) => html`<sp-icon-table-row-merge size=${size}></sp-icon-table-row-merge>` },
  { name: "Table row remove center", tag: "<sp-icon-table-row-remove-center>", story: (size) => html`<sp-icon-table-row-remove-center size=${size}></sp-icon-table-row-remove-center>` },
  { name: "Table row split", tag: "<sp-icon-table-row-split>", story: (size) => html`<sp-icon-table-row-split size=${size}></sp-icon-table-row-split>` },
  { name: "Table select column", tag: "<sp-icon-table-select-column>", story: (size) => html`<sp-icon-table-select-column size=${size}></sp-icon-table-select-column>` },
  { name: "Table select row", tag: "<sp-icon-table-select-row>", story: (size) => html`<sp-icon-table-select-row size=${size}></sp-icon-table-select-row>` },
  { name: "Tag bold", tag: "<sp-icon-tag-bold>", story: (size) => html`<sp-icon-tag-bold size=${size}></sp-icon-tag-bold>` },
  { name: "Tag italic", tag: "<sp-icon-tag-italic>", story: (size) => html`<sp-icon-tag-italic size=${size}></sp-icon-tag-italic>` },
  { name: "Tag underline", tag: "<sp-icon-tag-underline>", story: (size) => html`<sp-icon-tag-underline size=${size}></sp-icon-tag-underline>` },
  { name: "Target", tag: "<sp-icon-target>", story: (size) => html`<sp-icon-target size=${size}></sp-icon-target>` },
  { name: "Targeted", tag: "<sp-icon-targeted>", story: (size) => html`<sp-icon-targeted size=${size}></sp-icon-targeted>` },
  { name: "Task list", tag: "<sp-icon-task-list>", story: (size) => html`<sp-icon-task-list size=${size}></sp-icon-task-list>` },
  { name: "Teapot", tag: "<sp-icon-teapot>", story: (size) => html`<sp-icon-teapot size=${size}></sp-icon-teapot>` },
  { name: "Temperature", tag: "<sp-icon-temperature>", story: (size) => html`<sp-icon-temperature size=${size}></sp-icon-temperature>` },
  { name: "Test a b", tag: "<sp-icon-test-a-b>", story: (size) => html`<sp-icon-test-a-b size=${size}></sp-icon-test-a-b>` },
  { name: "Test ab edit", tag: "<sp-icon-test-ab-edit>", story: (size) => html`<sp-icon-test-ab-edit size=${size}></sp-icon-test-ab-edit>` },
  { name: "Test ab gear", tag: "<sp-icon-test-ab-gear>", story: (size) => html`<sp-icon-test-ab-gear size=${size}></sp-icon-test-ab-gear>` },
  { name: "Test ab remove", tag: "<sp-icon-test-ab-remove>", story: (size) => html`<sp-icon-test-ab-remove size=${size}></sp-icon-test-ab-remove>` },
  { name: "Test profile", tag: "<sp-icon-test-profile>", story: (size) => html`<sp-icon-test-profile size=${size}></sp-icon-test-profile>` },
  { name: "Text", tag: "<sp-icon-text>", story: (size) => html`<sp-icon-text size=${size}></sp-icon-text>` },
  { name: "Text add", tag: "<sp-icon-text-add>", story: (size) => html`<sp-icon-text-add size=${size}></sp-icon-text-add>` },
  { name: "Text align center", tag: "<sp-icon-text-align-center>", story: (size) => html`<sp-icon-text-align-center size=${size}></sp-icon-text-align-center>` },
  { name: "Text align justify", tag: "<sp-icon-text-align-justify>", story: (size) => html`<sp-icon-text-align-justify size=${size}></sp-icon-text-align-justify>` },
  { name: "Text align left", tag: "<sp-icon-text-align-left>", story: (size) => html`<sp-icon-text-align-left size=${size}></sp-icon-text-align-left>` },
  { name: "Text align right", tag: "<sp-icon-text-align-right>", story: (size) => html`<sp-icon-text-align-right size=${size}></sp-icon-text-align-right>` },
  { name: "Text baseline shift", tag: "<sp-icon-text-baseline-shift>", story: (size) => html`<sp-icon-text-baseline-shift size=${size}></sp-icon-text-baseline-shift>` },
  { name: "Text bold", tag: "<sp-icon-text-bold>", story: (size) => html`<sp-icon-text-bold size=${size}></sp-icon-text-bold>` },
  { name: "Text bulleted", tag: "<sp-icon-text-bulleted>", story: (size) => html`<sp-icon-text-bulleted size=${size}></sp-icon-text-bulleted>` },
  { name: "Text bulleted attach", tag: "<sp-icon-text-bulleted-attach>", story: (size) => html`<sp-icon-text-bulleted-attach size=${size}></sp-icon-text-bulleted-attach>` },
  { name: "Text bulleted hierarchy", tag: "<sp-icon-text-bulleted-hierarchy>", story: (size) => html`<sp-icon-text-bulleted-hierarchy size=${size}></sp-icon-text-bulleted-hierarchy>` },
  { name: "Text bulleted hierarchy exclude", tag: "<sp-icon-text-bulleted-hierarchy-exclude>", story: (size) => html`<sp-icon-text-bulleted-hierarchy-exclude size=${size}></sp-icon-text-bulleted-hierarchy-exclude>` },
  { name: "Text color", tag: "<sp-icon-text-color>", story: (size) => html`<sp-icon-text-color size=${size}></sp-icon-text-color>` },
  { name: "Text decrease", tag: "<sp-icon-text-decrease>", story: (size) => html`<sp-icon-text-decrease size=${size}></sp-icon-text-decrease>` },
  { name: "Text edit", tag: "<sp-icon-text-edit>", story: (size) => html`<sp-icon-text-edit size=${size}></sp-icon-text-edit>` },
  { name: "Text exclude", tag: "<sp-icon-text-exclude>", story: (size) => html`<sp-icon-text-exclude size=${size}></sp-icon-text-exclude>` },
  { name: "Text increase", tag: "<sp-icon-text-increase>", story: (size) => html`<sp-icon-text-increase size=${size}></sp-icon-text-increase>` },
  { name: "Text indent decrease", tag: "<sp-icon-text-indent-decrease>", story: (size) => html`<sp-icon-text-indent-decrease size=${size}></sp-icon-text-indent-decrease>` },
  { name: "Text indent increase", tag: "<sp-icon-text-indent-increase>", story: (size) => html`<sp-icon-text-indent-increase size=${size}></sp-icon-text-indent-increase>` },
  { name: "Text italic", tag: "<sp-icon-text-italic>", story: (size) => html`<sp-icon-text-italic size=${size}></sp-icon-text-italic>` },
  { name: "Text kerning", tag: "<sp-icon-text-kerning>", story: (size) => html`<sp-icon-text-kerning size=${size}></sp-icon-text-kerning>` },
  { name: "Text lettered lower case", tag: "<sp-icon-text-lettered-lower-case>", story: (size) => html`<sp-icon-text-lettered-lower-case size=${size}></sp-icon-text-lettered-lower-case>` },
  { name: "Text lettered upper case", tag: "<sp-icon-text-lettered-upper-case>", story: (size) => html`<sp-icon-text-lettered-upper-case size=${size}></sp-icon-text-lettered-upper-case>` },
  { name: "Text numbered", tag: "<sp-icon-text-numbered>", story: (size) => html`<sp-icon-text-numbered size=${size}></sp-icon-text-numbered>` },
  { name: "Text paragraph", tag: "<sp-icon-text-paragraph>", story: (size) => html`<sp-icon-text-paragraph size=${size}></sp-icon-text-paragraph>` },
  { name: "Text roman lowercase", tag: "<sp-icon-text-roman-lowercase>", story: (size) => html`<sp-icon-text-roman-lowercase size=${size}></sp-icon-text-roman-lowercase>` },
  { name: "Text roman uppercase", tag: "<sp-icon-text-roman-uppercase>", story: (size) => html`<sp-icon-text-roman-uppercase size=${size}></sp-icon-text-roman-uppercase>` },
  { name: "Text size", tag: "<sp-icon-text-size>", story: (size) => html`<sp-icon-text-size size=${size}></sp-icon-text-size>` },
  { name: "Text size add", tag: "<sp-icon-text-size-add>", story: (size) => html`<sp-icon-text-size-add size=${size}></sp-icon-text-size-add>` },
  { name: "Text space after", tag: "<sp-icon-text-space-after>", story: (size) => html`<sp-icon-text-space-after size=${size}></sp-icon-text-space-after>` },
  { name: "Text space before", tag: "<sp-icon-text-space-before>", story: (size) => html`<sp-icon-text-space-before size=${size}></sp-icon-text-space-before>` },
  { name: "Text strikethrough", tag: "<sp-icon-text-strikethrough>", story: (size) => html`<sp-icon-text-strikethrough size=${size}></sp-icon-text-strikethrough>` },
  { name: "Text stroke", tag: "<sp-icon-text-stroke>", story: (size) => html`<sp-icon-text-stroke size=${size}></sp-icon-text-stroke>` },
  { name: "Text style", tag: "<sp-icon-text-style>", story: (size) => html`<sp-icon-text-style size=${size}></sp-icon-text-style>` },
  { name: "Text subscript", tag: "<sp-icon-text-subscript>", story: (size) => html`<sp-icon-text-subscript size=${size}></sp-icon-text-subscript>` },
  { name: "Text superscript", tag: "<sp-icon-text-superscript>", story: (size) => html`<sp-icon-text-superscript size=${size}></sp-icon-text-superscript>` },
  { name: "Text tracking", tag: "<sp-icon-text-tracking>", story: (size) => html`<sp-icon-text-tracking size=${size}></sp-icon-text-tracking>` },
  { name: "Text underline", tag: "<sp-icon-text-underline>", story: (size) => html`<sp-icon-text-underline size=${size}></sp-icon-text-underline>` },
  { name: "Thumb down", tag: "<sp-icon-thumb-down>", story: (size) => html`<sp-icon-thumb-down size=${size}></sp-icon-thumb-down>` },
  { name: "Thumb down outline", tag: "<sp-icon-thumb-down-outline>", story: (size) => html`<sp-icon-thumb-down-outline size=${size}></sp-icon-thumb-down-outline>` },
  { name: "Thumb up", tag: "<sp-icon-thumb-up>", story: (size) => html`<sp-icon-thumb-up size=${size}></sp-icon-thumb-up>` },
  { name: "Thumb up outline", tag: "<sp-icon-thumb-up-outline>", story: (size) => html`<sp-icon-thumb-up-outline size=${size}></sp-icon-thumb-up-outline>` },
  { name: "Tips", tag: "<sp-icon-tips>", story: (size) => html`<sp-icon-tips size=${size}></sp-icon-tips>` },
  { name: "Train", tag: "<sp-icon-train>", story: (size) => html`<sp-icon-train size=${size}></sp-icon-train>` },
  { name: "Transfer to platform", tag: "<sp-icon-transfer-to-platform>", story: (size) => html`<sp-icon-transfer-to-platform size=${size}></sp-icon-transfer-to-platform>` },
  { name: "Transparency", tag: "<sp-icon-transparency>", story: (size) => html`<sp-icon-transparency size=${size}></sp-icon-transparency>` },
  { name: "Trap", tag: "<sp-icon-trap>", story: (size) => html`<sp-icon-trap size=${size}></sp-icon-trap>` },
  { name: "Tree collapse", tag: "<sp-icon-tree-collapse>", story: (size) => html`<sp-icon-tree-collapse size=${size}></sp-icon-tree-collapse>` },
  { name: "Tree collapse all", tag: "<sp-icon-tree-collapse-all>", story: (size) => html`<sp-icon-tree-collapse-all size=${size}></sp-icon-tree-collapse-all>` },
  { name: "Tree expand", tag: "<sp-icon-tree-expand>", story: (size) => html`<sp-icon-tree-expand size=${size}></sp-icon-tree-expand>` },
  { name: "Tree expand all", tag: "<sp-icon-tree-expand-all>", story: (size) => html`<sp-icon-tree-expand-all size=${size}></sp-icon-tree-expand-all>` },
  { name: "Tree view", tag: "<sp-icon-tree-view>", story: (size) => html`<sp-icon-tree-view size=${size}></sp-icon-tree-view>` },
  { name: "Trend inspect", tag: "<sp-icon-trend-inspect>", story: (size) => html`<sp-icon-trend-inspect size=${size}></sp-icon-trend-inspect>` },
  { name: "Trim path", tag: "<sp-icon-trim-path>", story: (size) => html`<sp-icon-trim-path size=${size}></sp-icon-trim-path>` },
  { name: "Trophy", tag: "<sp-icon-trophy>", story: (size) => html`<sp-icon-trophy size=${size}></sp-icon-trophy>` },
  { name: "Type", tag: "<sp-icon-type>", story: (size) => html`<sp-icon-type size=${size}></sp-icon-type>` },
  { name: "Usa", tag: "<sp-icon-usa>", story: (size) => html`<sp-icon-usa size=${size}></sp-icon-usa>` },
  { name: "Underline", tag: "<sp-icon-underline>", story: (size) => html`<sp-icon-underline size=${size}></sp-icon-underline>` },
  { name: "Undo", tag: "<sp-icon-undo>", story: (size) => html`<sp-icon-undo size=${size}></sp-icon-undo>` },
  { name: "Ungroup", tag: "<sp-icon-ungroup>", story: (size) => html`<sp-icon-ungroup size=${size}></sp-icon-ungroup>` },
  { name: "Unlink", tag: "<sp-icon-unlink>", story: (size) => html`<sp-icon-unlink size=${size}></sp-icon-unlink>` },
  { name: "Unmerge", tag: "<sp-icon-unmerge>", story: (size) => html`<sp-icon-unmerge size=${size}></sp-icon-unmerge>` },
  { name: "Unresolved comment", tag: "<sp-icon-unresolved-comment>", story: (size) => html`<sp-icon-unresolved-comment size=${size}></sp-icon-unresolved-comment>` },
  { name: "Upload to cloud", tag: "<sp-icon-upload-to-cloud>", story: (size) => html`<sp-icon-upload-to-cloud size=${size}></sp-icon-upload-to-cloud>` },
  { name: "Upload to cloud outline", tag: "<sp-icon-upload-to-cloud-outline>", story: (size) => html`<sp-icon-upload-to-cloud-outline size=${size}></sp-icon-upload-to-cloud-outline>` },
  { name: "User", tag: "<sp-icon-user>", story: (size) => html`<sp-icon-user size=${size}></sp-icon-user>` },
  { name: "User activity", tag: "<sp-icon-user-activity>", story: (size) => html`<sp-icon-user-activity size=${size}></sp-icon-user-activity>` },
  { name: "User add", tag: "<sp-icon-user-add>", story: (size) => html`<sp-icon-user-add size=${size}></sp-icon-user-add>` },
  { name: "User admin", tag: "<sp-icon-user-admin>", story: (size) => html`<sp-icon-user-admin size=${size}></sp-icon-user-admin>` },
  { name: "User arrow", tag: "<sp-icon-user-arrow>", story: (size) => html`<sp-icon-user-arrow size=${size}></sp-icon-user-arrow>` },
  { name: "User checked out", tag: "<sp-icon-user-checked-out>", story: (size) => html`<sp-icon-user-checked-out size=${size}></sp-icon-user-checked-out>` },
  { name: "User developer", tag: "<sp-icon-user-developer>", story: (size) => html`<sp-icon-user-developer size=${size}></sp-icon-user-developer>` },
  { name: "User edit", tag: "<sp-icon-user-edit>", story: (size) => html`<sp-icon-user-edit size=${size}></sp-icon-user-edit>` },
  { name: "User exclude", tag: "<sp-icon-user-exclude>", story: (size) => html`<sp-icon-user-exclude size=${size}></sp-icon-user-exclude>` },
  { name: "User group", tag: "<sp-icon-user-group>", story: (size) => html`<sp-icon-user-group size=${size}></sp-icon-user-group>` },
  { name: "User lock", tag: "<sp-icon-user-lock>", story: (size) => html`<sp-icon-user-lock size=${size}></sp-icon-user-lock>` },
  { name: "User share", tag: "<sp-icon-user-share>", story: (size) => html`<sp-icon-user-share size=${size}></sp-icon-user-share>` },
  { name: "Users add", tag: "<sp-icon-users-add>", story: (size) => html`<sp-icon-users-add size=${size}></sp-icon-users-add>` },
  { name: "Users exclude", tag: "<sp-icon-users-exclude>", story: (size) => html`<sp-icon-users-exclude size=${size}></sp-icon-users-exclude>` },
  { name: "Users lock", tag: "<sp-icon-users-lock>", story: (size) => html`<sp-icon-users-lock size=${size}></sp-icon-users-lock>` },
  { name: "Users share", tag: "<sp-icon-users-share>", story: (size) => html`<sp-icon-users-share size=${size}></sp-icon-users-share>` },
  { name: "Variable", tag: "<sp-icon-variable>", story: (size) => html`<sp-icon-variable size=${size}></sp-icon-variable>` },
  { name: "Vector draw", tag: "<sp-icon-vector-draw>", story: (size) => html`<sp-icon-vector-draw size=${size}></sp-icon-vector-draw>` },
  { name: "Vertical masonry grid view", tag: "<sp-icon-vertical-masonry-grid-view>", story: (size) => html`<sp-icon-vertical-masonry-grid-view size=${size}></sp-icon-vertical-masonry-grid-view>` },
  { name: "Video checked out", tag: "<sp-icon-video-checked-out>", story: (size) => html`<sp-icon-video-checked-out size=${size}></sp-icon-video-checked-out>` },
  { name: "Video filled", tag: "<sp-icon-video-filled>", story: (size) => html`<sp-icon-video-filled size=${size}></sp-icon-video-filled>` },
  { name: "Video outline", tag: "<sp-icon-video-outline>", story: (size) => html`<sp-icon-video-outline size=${size}></sp-icon-video-outline>` },
  { name: "View all tags", tag: "<sp-icon-view-all-tags>", story: (size) => html`<sp-icon-view-all-tags size=${size}></sp-icon-view-all-tags>` },
  { name: "View bi week", tag: "<sp-icon-view-bi-week>", story: (size) => html`<sp-icon-view-bi-week size=${size}></sp-icon-view-bi-week>` },
  { name: "View card", tag: "<sp-icon-view-card>", story: (size) => html`<sp-icon-view-card size=${size}></sp-icon-view-card>` },
  { name: "View card one col", tag: "<sp-icon-view-card-one-col>", story: (size) => html`<sp-icon-view-card-one-col size=${size}></sp-icon-view-card-one-col>` },
  { name: "View column", tag: "<sp-icon-view-column>", story: (size) => html`<sp-icon-view-column size=${size}></sp-icon-view-column>` },
  { name: "View day", tag: "<sp-icon-view-day>", story: (size) => html`<sp-icon-view-day size=${size}></sp-icon-view-day>` },
  { name: "View detail", tag: "<sp-icon-view-detail>", story: (size) => html`<sp-icon-view-detail size=${size}></sp-icon-view-detail>` },
  { name: "View grid", tag: "<sp-icon-view-grid>", story: (size) => html`<sp-icon-view-grid size=${size}></sp-icon-view-grid>` },
  { name: "View list", tag: "<sp-icon-view-list>", story: (size) => html`<sp-icon-view-list size=${size}></sp-icon-view-list>` },
  { name: "View row", tag: "<sp-icon-view-row>", story: (size) => html`<sp-icon-view-row size=${size}></sp-icon-view-row>` },
  { name: "View single", tag: "<sp-icon-view-single>", story: (size) => html`<sp-icon-view-single size=${size}></sp-icon-view-single>` },
  { name: "View stack", tag: "<sp-icon-view-stack>", story: (size) => html`<sp-icon-view-stack size=${size}></sp-icon-view-stack>` },
  { name: "View table", tag: "<sp-icon-view-table>", story: (size) => html`<sp-icon-view-table size=${size}></sp-icon-view-table>` },
  { name: "View week", tag: "<sp-icon-view-week>", story: (size) => html`<sp-icon-view-week size=${size}></sp-icon-view-week>` },
  { name: "Viewed mark as", tag: "<sp-icon-viewed-mark-as>", story: (size) => html`<sp-icon-viewed-mark-as size=${size}></sp-icon-viewed-mark-as>` },
  { name: "Vignette", tag: "<sp-icon-vignette>", story: (size) => html`<sp-icon-vignette size=${size}></sp-icon-vignette>` },
  { name: "Visibility", tag: "<sp-icon-visibility>", story: (size) => html`<sp-icon-visibility size=${size}></sp-icon-visibility>` },
  { name: "Visibility off", tag: "<sp-icon-visibility-off>", story: (size) => html`<sp-icon-visibility-off size=${size}></sp-icon-visibility-off>` },
  { name: "Visit", tag: "<sp-icon-visit>", story: (size) => html`<sp-icon-visit size=${size}></sp-icon-visit>` },
  { name: "Visit share", tag: "<sp-icon-visit-share>", story: (size) => html`<sp-icon-visit-share size=${size}></sp-icon-visit-share>` },
  { name: "Voice over", tag: "<sp-icon-voice-over>", story: (size) => html`<sp-icon-voice-over size=${size}></sp-icon-voice-over>` },
  { name: "Volume mute", tag: "<sp-icon-volume-mute>", story: (size) => html`<sp-icon-volume-mute size=${size}></sp-icon-volume-mute>` },
  { name: "Volume one", tag: "<sp-icon-volume-one>", story: (size) => html`<sp-icon-volume-one size=${size}></sp-icon-volume-one>` },
  { name: "Volume three", tag: "<sp-icon-volume-three>", story: (size) => html`<sp-icon-volume-three size=${size}></sp-icon-volume-three>` },
  { name: "Volume two", tag: "<sp-icon-volume-two>", story: (size) => html`<sp-icon-volume-two size=${size}></sp-icon-volume-two>` },
  { name: "Watch", tag: "<sp-icon-watch>", story: (size) => html`<sp-icon-watch size=${size}></sp-icon-watch>` },
  { name: "Web page", tag: "<sp-icon-web-page>", story: (size) => html`<sp-icon-web-page size=${size}></sp-icon-web-page>` },
  { name: "Web pages", tag: "<sp-icon-web-pages>", story: (size) => html`<sp-icon-web-pages size=${size}></sp-icon-web-pages>` },
  { name: "Workflow", tag: "<sp-icon-workflow>", story: (size) => html`<sp-icon-workflow size=${size}></sp-icon-workflow>` },
  { name: "Workflow add", tag: "<sp-icon-workflow-add>", story: (size) => html`<sp-icon-workflow-add size=${size}></sp-icon-workflow-add>` },
  { name: "Wrench", tag: "<sp-icon-wrench>", story: (size) => html`<sp-icon-wrench size=${size}></sp-icon-wrench>` },
  { name: "Zoom in", tag: "<sp-icon-zoom-in>", story: (size) => html`<sp-icon-zoom-in size=${size}></sp-icon-zoom-in>` },
  { name: "Zoom out", tag: "<sp-icon-zoom-out>", story: (size) => html`<sp-icon-zoom-out size=${size}></sp-icon-zoom-out>` },
  { name: "Abc", tag: "<sp-icon-abc>", story: (size) => html`<sp-icon-abc size=${size}></sp-icon-abc>` },
  { name: "Accessibility", tag: "<sp-icon-accessibility>", story: (size) => html`<sp-icon-accessibility size=${size}></sp-icon-accessibility>` },
  { name: "Add circle", tag: "<sp-icon-add-circle>", story: (size) => html`<sp-icon-add-circle size=${size}></sp-icon-add-circle>` },
  { name: "Add content", tag: "<sp-icon-add-content>", story: (size) => html`<sp-icon-add-content size=${size}></sp-icon-add-content>` },
  { name: "Add", tag: "<sp-icon-add>", story: (size) => html`<sp-icon-add size=${size}></sp-icon-add>` },
  { name: "Alert diamond", tag: "<sp-icon-alert-diamond>", story: (size) => html`<sp-icon-alert-diamond size=${size}></sp-icon-alert-diamond>` },
  { name: "Alert triangle", tag: "<sp-icon-alert-triangle>", story: (size) => html`<sp-icon-alert-triangle size=${size}></sp-icon-alert-triangle>` },
  { name: "Align bottom", tag: "<sp-icon-align-bottom>", story: (size) => html`<sp-icon-align-bottom size=${size}></sp-icon-align-bottom>` },
  { name: "Align center", tag: "<sp-icon-align-center>", story: (size) => html`<sp-icon-align-center size=${size}></sp-icon-align-center>` },
  { name: "Align left", tag: "<sp-icon-align-left>", story: (size) => html`<sp-icon-align-left size=${size}></sp-icon-align-left>` },
  { name: "Align middle", tag: "<sp-icon-align-middle>", story: (size) => html`<sp-icon-align-middle size=${size}></sp-icon-align-middle>` },
  { name: "Align right", tag: "<sp-icon-align-right>", story: (size) => html`<sp-icon-align-right size=${size}></sp-icon-align-right>` },
  { name: "Align top", tag: "<sp-icon-align-top>", story: (size) => html`<sp-icon-align-top size=${size}></sp-icon-align-top>` },
  { name: "Animation no", tag: "<sp-icon-animation-no>", story: (size) => html`<sp-icon-animation-no size=${size}></sp-icon-animation-no>` },
  { name: "Animation", tag: "<sp-icon-animation>", story: (size) => html`<sp-icon-animation size=${size}></sp-icon-animation>` },
  { name: "App", tag: "<sp-icon-app>", story: (size) => html`<sp-icon-app size=${size}></sp-icon-app>` },
  { name: "Apps all", tag: "<sp-icon-apps-all>", story: (size) => html`<sp-icon-apps-all size=${size}></sp-icon-apps-all>` },
  { name: "Apps", tag: "<sp-icon-apps>", story: (size) => html`<sp-icon-apps size=${size}></sp-icon-apps>` },
  { name: "Archive", tag: "<sp-icon-archive>", story: (size) => html`<sp-icon-archive size=${size}></sp-icon-archive>` },
  { name: "Arrow head tool", tag: "<sp-icon-arrow-head-tool>", story: (size) => html`<sp-icon-arrow-head-tool size=${size}></sp-icon-arrow-head-tool>` },
  { name: "Artboard", tag: "<sp-icon-artboard>", story: (size) => html`<sp-icon-artboard size=${size}></sp-icon-artboard>` },
  { name: "Aspect ratio", tag: "<sp-icon-aspect-ratio>", story: (size) => html`<sp-icon-aspect-ratio size=${size}></sp-icon-aspect-ratio>` },
  { name: "Asset", tag: "<sp-icon-asset>", story: (size) => html`<sp-icon-asset size=${size}></sp-icon-asset>` },
  { name: "Attach", tag: "<sp-icon-attach>", story: (size) => html`<sp-icon-attach size=${size}></sp-icon-attach>` },
  { name: "Audio wave", tag: "<sp-icon-audio-wave>", story: (size) => html`<sp-icon-audio-wave size=${size}></sp-icon-audio-wave>` },
  { name: "Auto select subject", tag: "<sp-icon-auto-select-subject>", story: (size) => html`<sp-icon-auto-select-subject size=${size}></sp-icon-auto-select-subject>` },
  { name: "Background", tag: "<sp-icon-background>", story: (size) => html`<sp-icon-background size=${size}></sp-icon-background>` },
  { name: "Badge verified", tag: "<sp-icon-badge-verified>", story: (size) => html`<sp-icon-badge-verified size=${size}></sp-icon-badge-verified>` },
  { name: "Bell rotated", tag: "<sp-icon-bell-rotated>", story: (size) => html`<sp-icon-bell-rotated size=${size}></sp-icon-bell-rotated>` },
  { name: "Bell", tag: "<sp-icon-bell>", story: (size) => html`<sp-icon-bell size=${size}></sp-icon-bell>` },
  { name: "Beta app", tag: "<sp-icon-beta-app>", story: (size) => html`<sp-icon-beta-app size=${size}></sp-icon-beta-app>` },
  { name: "Binoculars", tag: "<sp-icon-binoculars>", story: (size) => html`<sp-icon-binoculars size=${size}></sp-icon-binoculars>` },
  { name: "Blur", tag: "<sp-icon-blur>", story: (size) => html`<sp-icon-blur size=${size}></sp-icon-blur>` },
  { name: "Bookmark", tag: "<sp-icon-bookmark>", story: (size) => html`<sp-icon-bookmark size=${size}></sp-icon-bookmark>` },
  { name: "Brand", tag: "<sp-icon-brand>", story: (size) => html`<sp-icon-brand size=${size}></sp-icon-brand>` },
  { name: "Briefcase", tag: "<sp-icon-briefcase>", story: (size) => html`<sp-icon-briefcase size=${size}></sp-icon-briefcase>` },
  { name: "Brightness contrast", tag: "<sp-icon-brightness-contrast>", story: (size) => html`<sp-icon-brightness-contrast size=${size}></sp-icon-brightness-contrast>` },
  { name: "Brush", tag: "<sp-icon-brush>", story: (size) => html`<sp-icon-brush size=${size}></sp-icon-brush>` },
  { name: "Bug", tag: "<sp-icon-bug>", story: (size) => html`<sp-icon-bug size=${size}></sp-icon-bug>` },
  { name: "Building", tag: "<sp-icon-building>", story: (size) => html`<sp-icon-building size=${size}></sp-icon-building>` },
  { name: "Buildings", tag: "<sp-icon-buildings>", story: (size) => html`<sp-icon-buildings size=${size}></sp-icon-buildings>` },
  { name: "Cclibrary", tag: "<sp-icon-cclibrary>", story: (size) => html`<sp-icon-cclibrary size=${size}></sp-icon-cclibrary>` },
  { name: "Calendar add", tag: "<sp-icon-calendar-add>", story: (size) => html`<sp-icon-calendar-add size=${size}></sp-icon-calendar-add>` },
  { name: "Calendar day", tag: "<sp-icon-calendar-day>", story: (size) => html`<sp-icon-calendar-day size=${size}></sp-icon-calendar-day>` },
  { name: "Calendar edit", tag: "<sp-icon-calendar-edit>", story: (size) => html`<sp-icon-calendar-edit size=${size}></sp-icon-calendar-edit>` },
  { name: "Calendar week", tag: "<sp-icon-calendar-week>", story: (size) => html`<sp-icon-calendar-week size=${size}></sp-icon-calendar-week>` },
  { name: "Calendar", tag: "<sp-icon-calendar>", story: (size) => html`<sp-icon-calendar size=${size}></sp-icon-calendar>` },
  { name: "Call center", tag: "<sp-icon-call-center>", story: (size) => html`<sp-icon-call-center size=${size}></sp-icon-call-center>` },
  { name: "Camera properties", tag: "<sp-icon-camera-properties>", story: (size) => html`<sp-icon-camera-properties size=${size}></sp-icon-camera-properties>` },
  { name: "Camera", tag: "<sp-icon-camera>", story: (size) => html`<sp-icon-camera size=${size}></sp-icon-camera>` },
  { name: "Cancel", tag: "<sp-icon-cancel>", story: (size) => html`<sp-icon-cancel size=${size}></sp-icon-cancel>` },
  { name: "Channel", tag: "<sp-icon-channel>", story: (size) => html`<sp-icon-channel size=${size}></sp-icon-channel>` },
  { name: "Chart bar vert", tag: "<sp-icon-chart-bar-vert>", story: (size) => html`<sp-icon-chart-bar-vert size=${size}></sp-icon-chart-bar-vert>` },
  { name: "Chart pie", tag: "<sp-icon-chart-pie>", story: (size) => html`<sp-icon-chart-pie size=${size}></sp-icon-chart-pie>` },
  { name: "Chart trend", tag: "<sp-icon-chart-trend>", story: (size) => html`<sp-icon-chart-trend size=${size}></sp-icon-chart-trend>` },
  { name: "Chat", tag: "<sp-icon-chat>", story: (size) => html`<sp-icon-chat size=${size}></sp-icon-chat>` },
  { name: "Check box", tag: "<sp-icon-check-box>", story: (size) => html`<sp-icon-check-box size=${size}></sp-icon-check-box>` },
  { name: "Checkmark circle", tag: "<sp-icon-checkmark-circle>", story: (size) => html`<sp-icon-checkmark-circle size=${size}></sp-icon-checkmark-circle>` },
  { name: "Checkmark", tag: "<sp-icon-checkmark>", story: (size) => html`<sp-icon-checkmark size=${size}></sp-icon-checkmark>` },
  { name: "Chevron double left", tag: "<sp-icon-chevron-double-left>", story: (size) => html`<sp-icon-chevron-double-left size=${size}></sp-icon-chevron-double-left>` },
  { name: "Chevron double right", tag: "<sp-icon-chevron-double-right>", story: (size) => html`<sp-icon-chevron-double-right size=${size}></sp-icon-chevron-double-right>` },
  { name: "Chevron down", tag: "<sp-icon-chevron-down>", story: (size) => html`<sp-icon-chevron-down size=${size}></sp-icon-chevron-down>` },
  { name: "Chevron left", tag: "<sp-icon-chevron-left>", story: (size) => html`<sp-icon-chevron-left size=${size}></sp-icon-chevron-left>` },
  { name: "Chevron right", tag: "<sp-icon-chevron-right>", story: (size) => html`<sp-icon-chevron-right size=${size}></sp-icon-chevron-right>` },
  { name: "Chevron up", tag: "<sp-icon-chevron-up>", story: (size) => html`<sp-icon-chevron-up size=${size}></sp-icon-chevron-up>` },
  { name: "Circle", tag: "<sp-icon-circle>", story: (size) => html`<sp-icon-circle size=${size}></sp-icon-circle>` },
  { name: "Clock pending", tag: "<sp-icon-clock-pending>", story: (size) => html`<sp-icon-clock-pending size=${size}></sp-icon-clock-pending>` },
  { name: "Clock", tag: "<sp-icon-clock>", story: (size) => html`<sp-icon-clock size=${size}></sp-icon-clock>` },
  { name: "Close captions", tag: "<sp-icon-close-captions>", story: (size) => html`<sp-icon-close-captions size=${size}></sp-icon-close-captions>` },
  { name: "Close circle", tag: "<sp-icon-close-circle>", story: (size) => html`<sp-icon-close-circle size=${size}></sp-icon-close-circle>` },
  { name: "Close", tag: "<sp-icon-close>", story: (size) => html`<sp-icon-close size=${size}></sp-icon-close>` },
  { name: "Cloud state default", tag: "<sp-icon-cloud-state-default>", story: (size) => html`<sp-icon-cloud-state-default size=${size}></sp-icon-cloud-state-default>` },
  { name: "Cloud state disconnected", tag: "<sp-icon-cloud-state-disconnected>", story: (size) => html`<sp-icon-cloud-state-disconnected size=${size}></sp-icon-cloud-state-disconnected>` },
  { name: "Cloud state error red", tag: "<sp-icon-cloud-state-error-red>", story: (size) => html`<sp-icon-cloud-state-error-red size=${size}></sp-icon-cloud-state-error-red>` },
  { name: "Cloud state error", tag: "<sp-icon-cloud-state-error>", story: (size) => html`<sp-icon-cloud-state-error size=${size}></sp-icon-cloud-state-error>` },
  { name: "Cloud state in progress", tag: "<sp-icon-cloud-state-in-progress>", story: (size) => html`<sp-icon-cloud-state-in-progress size=${size}></sp-icon-cloud-state-in-progress>` },
  { name: "Cloud state online", tag: "<sp-icon-cloud-state-online>", story: (size) => html`<sp-icon-cloud-state-online size=${size}></sp-icon-cloud-state-online>` },
  { name: "Cloud state paused", tag: "<sp-icon-cloud-state-paused>", story: (size) => html`<sp-icon-cloud-state-paused size=${size}></sp-icon-cloud-state-paused>` },
  { name: "Cloud state pending", tag: "<sp-icon-cloud-state-pending>", story: (size) => html`<sp-icon-cloud-state-pending size=${size}></sp-icon-cloud-state-pending>` },
  { name: "Cloud state slow connection", tag: "<sp-icon-cloud-state-slow-connection>", story: (size) => html`<sp-icon-cloud-state-slow-connection size=${size}></sp-icon-cloud-state-slow-connection>` },
  { name: "Cloud", tag: "<sp-icon-cloud>", story: (size) => html`<sp-icon-cloud size=${size}></sp-icon-cloud>` },
  { name: "Code", tag: "<sp-icon-code>", story: (size) => html`<sp-icon-code size=${size}></sp-icon-code>` },
  { name: "Collection", tag: "<sp-icon-collection>", story: (size) => html`<sp-icon-collection size=${size}></sp-icon-collection>` },
  { name: "Color fill", tag: "<sp-icon-color-fill>", story: (size) => html`<sp-icon-color-fill size=${size}></sp-icon-color-fill>` },
  { name: "Color harmony", tag: "<sp-icon-color-harmony>", story: (size) => html`<sp-icon-color-harmony size=${size}></sp-icon-color-harmony>` },
  { name: "Color", tag: "<sp-icon-color>", story: (size) => html`<sp-icon-color size=${size}></sp-icon-color>` },
  { name: "Comment checkmark", tag: "<sp-icon-comment-checkmark>", story: (size) => html`<sp-icon-comment-checkmark size=${size}></sp-icon-comment-checkmark>` },
  { name: "Comment hide", tag: "<sp-icon-comment-hide>", story: (size) => html`<sp-icon-comment-hide size=${size}></sp-icon-comment-hide>` },
  { name: "Comment remove", tag: "<sp-icon-comment-remove>", story: (size) => html`<sp-icon-comment-remove size=${size}></sp-icon-comment-remove>` },
  { name: "Comment show", tag: "<sp-icon-comment-show>", story: (size) => html`<sp-icon-comment-show size=${size}></sp-icon-comment-show>` },
  { name: "Comment text", tag: "<sp-icon-comment-text>", story: (size) => html`<sp-icon-comment-text size=${size}></sp-icon-comment-text>` },
  { name: "Comment", tag: "<sp-icon-comment>", story: (size) => html`<sp-icon-comment size=${size}></sp-icon-comment>` },
  { name: "Community", tag: "<sp-icon-community>", story: (size) => html`<sp-icon-community size=${size}></sp-icon-community>` },
  { name: "Compare", tag: "<sp-icon-compare>", story: (size) => html`<sp-icon-compare size=${size}></sp-icon-compare>` },
  { name: "Contextual task bar", tag: "<sp-icon-contextual-task-bar>", story: (size) => html`<sp-icon-contextual-task-bar size=${size}></sp-icon-contextual-task-bar>` },
  { name: "Contrast", tag: "<sp-icon-contrast>", story: (size) => html`<sp-icon-contrast size=${size}></sp-icon-contrast>` },
  { name: "Copy", tag: "<sp-icon-copy>", story: (size) => html`<sp-icon-copy size=${size}></sp-icon-copy>` },
  { name: "Corner radius bottom left", tag: "<sp-icon-corner-radius-bottom-left>", story: (size) => html`<sp-icon-corner-radius-bottom-left size=${size}></sp-icon-corner-radius-bottom-left>` },
  { name: "Corner radius bottom right", tag: "<sp-icon-corner-radius-bottom-right>", story: (size) => html`<sp-icon-corner-radius-bottom-right size=${size}></sp-icon-corner-radius-bottom-right>` },
  { name: "Corner radius each", tag: "<sp-icon-corner-radius-each>", story: (size) => html`<sp-icon-corner-radius-each size=${size}></sp-icon-corner-radius-each>` },
  { name: "Corner radius top left", tag: "<sp-icon-corner-radius-top-left>", story: (size) => html`<sp-icon-corner-radius-top-left size=${size}></sp-icon-corner-radius-top-left>` },
  { name: "Corner radius top right", tag: "<sp-icon-corner-radius-top-right>", story: (size) => html`<sp-icon-corner-radius-top-right size=${size}></sp-icon-corner-radius-top-right>` },
  { name: "Corner radius", tag: "<sp-icon-corner-radius>", story: (size) => html`<sp-icon-corner-radius size=${size}></sp-icon-corner-radius>` },
  { name: "Crop rotate", tag: "<sp-icon-crop-rotate>", story: (size) => html`<sp-icon-crop-rotate size=${size}></sp-icon-crop-rotate>` },
  { name: "Crop", tag: "<sp-icon-crop>", story: (size) => html`<sp-icon-crop size=${size}></sp-icon-crop>` },
  { name: "Cursor click", tag: "<sp-icon-cursor-click>", story: (size) => html`<sp-icon-cursor-click size=${size}></sp-icon-cursor-click>` },
  { name: "Cut", tag: "<sp-icon-cut>", story: (size) => html`<sp-icon-cut size=${size}></sp-icon-cut>` },
  { name: "Data add", tag: "<sp-icon-data-add>", story: (size) => html`<sp-icon-data-add size=${size}></sp-icon-data-add>` },
  { name: "Data refresh", tag: "<sp-icon-data-refresh>", story: (size) => html`<sp-icon-data-refresh size=${size}></sp-icon-data-refresh>` },
  { name: "Data settings", tag: "<sp-icon-data-settings>", story: (size) => html`<sp-icon-data-settings size=${size}></sp-icon-data-settings>` },
  { name: "Data upload", tag: "<sp-icon-data-upload>", story: (size) => html`<sp-icon-data-upload size=${size}></sp-icon-data-upload>` },
  { name: "Data", tag: "<sp-icon-data>", story: (size) => html`<sp-icon-data size=${size}></sp-icon-data>` },
  { name: "Delete", tag: "<sp-icon-delete>", story: (size) => html`<sp-icon-delete size=${size}></sp-icon-delete>` },
  { name: "Device all", tag: "<sp-icon-device-all>", story: (size) => html`<sp-icon-device-all size=${size}></sp-icon-device-all>` },
  { name: "Device desktop mobile", tag: "<sp-icon-device-desktop-mobile>", story: (size) => html`<sp-icon-device-desktop-mobile size=${size}></sp-icon-device-desktop-mobile>` },
  { name: "Device desktop", tag: "<sp-icon-device-desktop>", story: (size) => html`<sp-icon-device-desktop size=${size}></sp-icon-device-desktop>` },
  { name: "Device laptop", tag: "<sp-icon-device-laptop>", story: (size) => html`<sp-icon-device-laptop size=${size}></sp-icon-device-laptop>` },
  { name: "Device mobile", tag: "<sp-icon-device-mobile>", story: (size) => html`<sp-icon-device-mobile size=${size}></sp-icon-device-mobile>` },
  { name: "Device multiscreen", tag: "<sp-icon-device-multiscreen>", story: (size) => html`<sp-icon-device-multiscreen size=${size}></sp-icon-device-multiscreen>` },
  { name: "Device phone", tag: "<sp-icon-device-phone>", story: (size) => html`<sp-icon-device-phone size=${size}></sp-icon-device-phone>` },
  { name: "Device tablet", tag: "<sp-icon-device-tablet>", story: (size) => html`<sp-icon-device-tablet size=${size}></sp-icon-device-tablet>` },
  { name: "Direct select", tag: "<sp-icon-direct-select>", story: (size) => html`<sp-icon-direct-select size=${size}></sp-icon-direct-select>` },
  { name: "Discover", tag: "<sp-icon-discover>", story: (size) => html`<sp-icon-discover size=${size}></sp-icon-discover>` },
  { name: "Distribute bottom edge", tag: "<sp-icon-distribute-bottom-edge>", story: (size) => html`<sp-icon-distribute-bottom-edge size=${size}></sp-icon-distribute-bottom-edge>` },
  { name: "Distribute horizontal center", tag: "<sp-icon-distribute-horizontal-center>", story: (size) => html`<sp-icon-distribute-horizontal-center size=${size}></sp-icon-distribute-horizontal-center>` },
  { name: "Distribute left edge", tag: "<sp-icon-distribute-left-edge>", story: (size) => html`<sp-icon-distribute-left-edge size=${size}></sp-icon-distribute-left-edge>` },
  { name: "Distribute right edge", tag: "<sp-icon-distribute-right-edge>", story: (size) => html`<sp-icon-distribute-right-edge size=${size}></sp-icon-distribute-right-edge>` },
  { name: "Distribute space horizontally", tag: "<sp-icon-distribute-space-horizontally>", story: (size) => html`<sp-icon-distribute-space-horizontally size=${size}></sp-icon-distribute-space-horizontally>` },
  { name: "Distribute space vertically", tag: "<sp-icon-distribute-space-vertically>", story: (size) => html`<sp-icon-distribute-space-vertically size=${size}></sp-icon-distribute-space-vertically>` },
  { name: "Distribute top edge", tag: "<sp-icon-distribute-top-edge>", story: (size) => html`<sp-icon-distribute-top-edge size=${size}></sp-icon-distribute-top-edge>` },
  { name: "Distribute vertical center", tag: "<sp-icon-distribute-vertical-center>", story: (size) => html`<sp-icon-distribute-vertical-center size=${size}></sp-icon-distribute-vertical-center>` },
  { name: "Download", tag: "<sp-icon-download>", story: (size) => html`<sp-icon-download size=${size}></sp-icon-download>` },
  { name: "Draw", tag: "<sp-icon-draw>", story: (size) => html`<sp-icon-draw size=${size}></sp-icon-draw>` },
  { name: "Duplicate", tag: "<sp-icon-duplicate>", story: (size) => html`<sp-icon-duplicate size=${size}></sp-icon-duplicate>` },
  { name: "Edit no", tag: "<sp-icon-edit-no>", story: (size) => html`<sp-icon-edit-no size=${size}></sp-icon-edit-no>` },
  { name: "Edit", tag: "<sp-icon-edit>", story: (size) => html`<sp-icon-edit size=${size}></sp-icon-edit>` },
  { name: "Education", tag: "<sp-icon-education>", story: (size) => html`<sp-icon-education size=${size}></sp-icon-education>` },
  { name: "Effect border", tag: "<sp-icon-effect-border>", story: (size) => html`<sp-icon-effect-border size=${size}></sp-icon-effect-border>` },
  { name: "Effects", tag: "<sp-icon-effects>", story: (size) => html`<sp-icon-effects size=${size}></sp-icon-effects>` },
  { name: "Email", tag: "<sp-icon-email>", story: (size) => html`<sp-icon-email size=${size}></sp-icon-email>` },
  { name: "Emoji", tag: "<sp-icon-emoji>", story: (size) => html`<sp-icon-emoji size=${size}></sp-icon-emoji>` },
  { name: "Enterprise", tag: "<sp-icon-enterprise>", story: (size) => html`<sp-icon-enterprise size=${size}></sp-icon-enterprise>` },
  { name: "Erase", tag: "<sp-icon-erase>", story: (size) => html`<sp-icon-erase size=${size}></sp-icon-erase>` },
  { name: "Export to", tag: "<sp-icon-export-to>", story: (size) => html`<sp-icon-export-to size=${size}></sp-icon-export-to>` },
  { name: "Export", tag: "<sp-icon-export>", story: (size) => html`<sp-icon-export size=${size}></sp-icon-export>` },
  { name: "Exposure", tag: "<sp-icon-exposure>", story: (size) => html`<sp-icon-exposure size=${size}></sp-icon-exposure>` },
  { name: "Eyedropper", tag: "<sp-icon-eyedropper>", story: (size) => html`<sp-icon-eyedropper size=${size}></sp-icon-eyedropper>` },
  { name: "Feedback", tag: "<sp-icon-feedback>", story: (size) => html`<sp-icon-feedback size=${size}></sp-icon-feedback>` },
  { name: "File add", tag: "<sp-icon-file-add>", story: (size) => html`<sp-icon-file-add size=${size}></sp-icon-file-add>` },
  { name: "File convert", tag: "<sp-icon-file-convert>", story: (size) => html`<sp-icon-file-convert size=${size}></sp-icon-file-convert>` },
  { name: "File text", tag: "<sp-icon-file-text>", story: (size) => html`<sp-icon-file-text size=${size}></sp-icon-file-text>` },
  { name: "File user", tag: "<sp-icon-file-user>", story: (size) => html`<sp-icon-file-user size=${size}></sp-icon-file-user>` },
  { name: "File", tag: "<sp-icon-file>", story: (size) => html`<sp-icon-file size=${size}></sp-icon-file>` },
  { name: "Files", tag: "<sp-icon-files>", story: (size) => html`<sp-icon-files size=${size}></sp-icon-files>` },
  { name: "Filmstrip", tag: "<sp-icon-filmstrip>", story: (size) => html`<sp-icon-filmstrip size=${size}></sp-icon-filmstrip>` },
  { name: "Filter", tag: "<sp-icon-filter>", story: (size) => html`<sp-icon-filter size=${size}></sp-icon-filter>` },
  { name: "Filters", tag: "<sp-icon-filters>", story: (size) => html`<sp-icon-filters size=${size}></sp-icon-filters>` },
  { name: "Find and replace", tag: "<sp-icon-find-and-replace>", story: (size) => html`<sp-icon-find-and-replace size=${size}></sp-icon-find-and-replace>` },
  { name: "Flag", tag: "<sp-icon-flag>", story: (size) => html`<sp-icon-flag size=${size}></sp-icon-flag>` },
  { name: "Flip horizontal", tag: "<sp-icon-flip-horizontal>", story: (size) => html`<sp-icon-flip-horizontal size=${size}></sp-icon-flip-horizontal>` },
  { name: "Flip vertical", tag: "<sp-icon-flip-vertical>", story: (size) => html`<sp-icon-flip-vertical size=${size}></sp-icon-flip-vertical>` },
  { name: "Folder add", tag: "<sp-icon-folder-add>", story: (size) => html`<sp-icon-folder-add size=${size}></sp-icon-folder-add>` },
  { name: "Folder breadcrumb", tag: "<sp-icon-folder-breadcrumb>", story: (size) => html`<sp-icon-folder-breadcrumb size=${size}></sp-icon-folder-breadcrumb>` },
  { name: "Folder clock", tag: "<sp-icon-folder-clock>", story: (size) => html`<sp-icon-folder-clock size=${size}></sp-icon-folder-clock>` },
  { name: "Folder move to", tag: "<sp-icon-folder-move-to>", story: (size) => html`<sp-icon-folder-move-to size=${size}></sp-icon-folder-move-to>` },
  { name: "Folder open", tag: "<sp-icon-folder-open>", story: (size) => html`<sp-icon-folder-open size=${size}></sp-icon-folder-open>` },
  { name: "Folder search", tag: "<sp-icon-folder-search>", story: (size) => html`<sp-icon-folder-search size=${size}></sp-icon-folder-search>` },
  { name: "Folder", tag: "<sp-icon-folder>", story: (size) => html`<sp-icon-folder size=${size}></sp-icon-folder>` },
  { name: "Font picker", tag: "<sp-icon-font-picker>", story: (size) => html`<sp-icon-font-picker size=${size}></sp-icon-font-picker>` },
  { name: "Full screen exit", tag: "<sp-icon-full-screen-exit>", story: (size) => html`<sp-icon-full-screen-exit size=${size}></sp-icon-full-screen-exit>` },
  { name: "Full screen", tag: "<sp-icon-full-screen>", story: (size) => html`<sp-icon-full-screen size=${size}></sp-icon-full-screen>` },
  { name: "Gift", tag: "<sp-icon-gift>", story: (size) => html`<sp-icon-gift size=${size}></sp-icon-gift>` },
  { name: "Globe grid", tag: "<sp-icon-globe-grid>", story: (size) => html`<sp-icon-globe-grid size=${size}></sp-icon-globe-grid>` },
  { name: "Gradient horizontal", tag: "<sp-icon-gradient-horizontal>", story: (size) => html`<sp-icon-gradient-horizontal size=${size}></sp-icon-gradient-horizontal>` },
  { name: "Gradient radial", tag: "<sp-icon-gradient-radial>", story: (size) => html`<sp-icon-gradient-radial size=${size}></sp-icon-gradient-radial>` },
  { name: "Gradient", tag: "<sp-icon-gradient>", story: (size) => html`<sp-icon-gradient size=${size}></sp-icon-gradient>` },
  { name: "Grid type dots", tag: "<sp-icon-grid-type-dots>", story: (size) => html`<sp-icon-grid-type-dots size=${size}></sp-icon-grid-type-dots>` },
  { name: "Grid type lines", tag: "<sp-icon-grid-type-lines>", story: (size) => html`<sp-icon-grid-type-lines size=${size}></sp-icon-grid-type-lines>` },
  { name: "Grids and rulers", tag: "<sp-icon-grids-and-rulers>", story: (size) => html`<sp-icon-grids-and-rulers size=${size}></sp-icon-grids-and-rulers>` },
  { name: "Group no", tag: "<sp-icon-group-no>", story: (size) => html`<sp-icon-group-no size=${size}></sp-icon-group-no>` },
  { name: "Group", tag: "<sp-icon-group>", story: (size) => html`<sp-icon-group size=${size}></sp-icon-group>` },
  { name: "Hand", tag: "<sp-icon-hand>", story: (size) => html`<sp-icon-hand size=${size}></sp-icon-hand>` },
  { name: "Heart", tag: "<sp-icon-heart>", story: (size) => html`<sp-icon-heart size=${size}></sp-icon-heart>` },
  { name: "Help circle", tag: "<sp-icon-help-circle>", story: (size) => html`<sp-icon-help-circle size=${size}></sp-icon-help-circle>` },
  { name: "History", tag: "<sp-icon-history>", story: (size) => html`<sp-icon-history size=${size}></sp-icon-history>` },
  { name: "Home", tag: "<sp-icon-home>", story: (size) => html`<sp-icon-home size=${size}></sp-icon-home>` },
  { name: "Image add", tag: "<sp-icon-image-add>", story: (size) => html`<sp-icon-image-add size=${size}></sp-icon-image-add>` },
  { name: "Image background remove", tag: "<sp-icon-image-background-remove>", story: (size) => html`<sp-icon-image-background-remove size=${size}></sp-icon-image-background-remove>` },
  { name: "Image", tag: "<sp-icon-image>", story: (size) => html`<sp-icon-image size=${size}></sp-icon-image>` },
  { name: "Images", tag: "<sp-icon-images>", story: (size) => html`<sp-icon-images size=${size}></sp-icon-images>` },
  { name: "Import", tag: "<sp-icon-import>", story: (size) => html`<sp-icon-import size=${size}></sp-icon-import>` },
  { name: "Info circle", tag: "<sp-icon-info-circle>", story: (size) => html`<sp-icon-info-circle size=${size}></sp-icon-info-circle>` },
  { name: "Interaction", tag: "<sp-icon-interaction>", story: (size) => html`<sp-icon-interaction size=${size}></sp-icon-interaction>` },
  { name: "Invert", tag: "<sp-icon-invert>", story: (size) => html`<sp-icon-invert size=${size}></sp-icon-invert>` },
  { name: "Invite", tag: "<sp-icon-invite>", story: (size) => html`<sp-icon-invite size=${size}></sp-icon-invite>` },
  { name: "Key", tag: "<sp-icon-key>", story: (size) => html`<sp-icon-key size=${size}></sp-icon-key>` },
  { name: "Keyboard", tag: "<sp-icon-keyboard>", story: (size) => html`<sp-icon-keyboard size=${size}></sp-icon-keyboard>` },
  { name: "Lasso select", tag: "<sp-icon-lasso-select>", story: (size) => html`<sp-icon-lasso-select size=${size}></sp-icon-lasso-select>` },
  { name: "Layers", tag: "<sp-icon-layers>", story: (size) => html`<sp-icon-layers size=${size}></sp-icon-layers>` },
  { name: "Layout", tag: "<sp-icon-layout>", story: (size) => html`<sp-icon-layout size=${size}></sp-icon-layout>` },
  { name: "Leave", tag: "<sp-icon-leave>", story: (size) => html`<sp-icon-leave size=${size}></sp-icon-leave>` },
  { name: "Lightbulb", tag: "<sp-icon-lightbulb>", story: (size) => html`<sp-icon-lightbulb size=${size}></sp-icon-lightbulb>` },
  { name: "Lighten", tag: "<sp-icon-lighten>", story: (size) => html`<sp-icon-lighten size=${size}></sp-icon-lighten>` },
  { name: "Line height", tag: "<sp-icon-line-height>", story: (size) => html`<sp-icon-line-height size=${size}></sp-icon-line-height>` },
  { name: "Line", tag: "<sp-icon-line>", story: (size) => html`<sp-icon-line size=${size}></sp-icon-line>` },
  { name: "Link vertical", tag: "<sp-icon-link-vertical>", story: (size) => html`<sp-icon-link-vertical size=${size}></sp-icon-link-vertical>` },
  { name: "Link", tag: "<sp-icon-link>", story: (size) => html`<sp-icon-link size=${size}></sp-icon-link>` },
  { name: "List bulleted", tag: "<sp-icon-list-bulleted>", story: (size) => html`<sp-icon-list-bulleted size=${size}></sp-icon-list-bulleted>` },
  { name: "List multi select", tag: "<sp-icon-list-multi-select>", story: (size) => html`<sp-icon-list-multi-select size=${size}></sp-icon-list-multi-select>` },
  { name: "List numbered", tag: "<sp-icon-list-numbered>", story: (size) => html`<sp-icon-list-numbered size=${size}></sp-icon-list-numbered>` },
  { name: "Location", tag: "<sp-icon-location>", story: (size) => html`<sp-icon-location size=${size}></sp-icon-location>` },
  { name: "Lock open", tag: "<sp-icon-lock-open>", story: (size) => html`<sp-icon-lock-open size=${size}></sp-icon-lock-open>` },
  { name: "Lock", tag: "<sp-icon-lock>", story: (size) => html`<sp-icon-lock size=${size}></sp-icon-lock>` },
  { name: "Logo", tag: "<sp-icon-logo>", story: (size) => html`<sp-icon-logo size=${size}></sp-icon-logo>` },
  { name: "Magic wand", tag: "<sp-icon-magic-wand>", story: (size) => html`<sp-icon-magic-wand size=${size}></sp-icon-magic-wand>` },
  { name: "Market", tag: "<sp-icon-market>", story: (size) => html`<sp-icon-market size=${size}></sp-icon-market>` },
  { name: "Mask disable", tag: "<sp-icon-mask-disable>", story: (size) => html`<sp-icon-mask-disable size=${size}></sp-icon-mask-disable>` },
  { name: "Mask", tag: "<sp-icon-mask>", story: (size) => html`<sp-icon-mask size=${size}></sp-icon-mask>` },
  { name: "Maximize", tag: "<sp-icon-maximize>", story: (size) => html`<sp-icon-maximize size=${size}></sp-icon-maximize>` },
  { name: "Media offline n", tag: "<sp-icon-media-offline-n>", story: (size) => html`<sp-icon-media-offline-n size=${size}></sp-icon-media-offline-n>` },
  { name: "Mention", tag: "<sp-icon-mention>", story: (size) => html`<sp-icon-mention size=${size}></sp-icon-mention>` },
  { name: "Menu hamburger", tag: "<sp-icon-menu-hamburger>", story: (size) => html`<sp-icon-menu-hamburger size=${size}></sp-icon-menu-hamburger>` },
  { name: "Microphone off", tag: "<sp-icon-microphone-off>", story: (size) => html`<sp-icon-microphone-off size=${size}></sp-icon-microphone-off>` },
  { name: "Microphone", tag: "<sp-icon-microphone>", story: (size) => html`<sp-icon-microphone size=${size}></sp-icon-microphone>` },
  { name: "Minimize", tag: "<sp-icon-minimize>", story: (size) => html`<sp-icon-minimize size=${size}></sp-icon-minimize>` },
  { name: "More", tag: "<sp-icon-more>", story: (size) => html`<sp-icon-more size=${size}></sp-icon-more>` },
  { name: "Move", tag: "<sp-icon-move>", story: (size) => html`<sp-icon-move size=${size}></sp-icon-move>` },
  { name: "Movie camera", tag: "<sp-icon-movie-camera>", story: (size) => html`<sp-icon-movie-camera size=${size}></sp-icon-movie-camera>` },
  { name: "Music note", tag: "<sp-icon-music-note>", story: (size) => html`<sp-icon-music-note size=${size}></sp-icon-music-note>` },
  { name: "Naming order", tag: "<sp-icon-naming-order>", story: (size) => html`<sp-icon-naming-order size=${size}></sp-icon-naming-order>` },
  { name: "New", tag: "<sp-icon-new>", story: (size) => html`<sp-icon-new size=${size}></sp-icon-new>` },
  { name: "Nudge", tag: "<sp-icon-nudge>", story: (size) => html`<sp-icon-nudge size=${size}></sp-icon-nudge>` },
  { name: "Open in", tag: "<sp-icon-open-in>", story: (size) => html`<sp-icon-open-in size=${size}></sp-icon-open-in>` },
  { name: "Order bottom", tag: "<sp-icon-order-bottom>", story: (size) => html`<sp-icon-order-bottom size=${size}></sp-icon-order-bottom>` },
  { name: "Order one down", tag: "<sp-icon-order-one-down>", story: (size) => html`<sp-icon-order-one-down size=${size}></sp-icon-order-one-down>` },
  { name: "Order one up", tag: "<sp-icon-order-one-up>", story: (size) => html`<sp-icon-order-one-up size=${size}></sp-icon-order-one-up>` },
  { name: "Order top", tag: "<sp-icon-order-top>", story: (size) => html`<sp-icon-order-top size=${size}></sp-icon-order-top>` },
  { name: "Order", tag: "<sp-icon-order>", story: (size) => html`<sp-icon-order size=${size}></sp-icon-order>` },
  { name: "Orientation landscape", tag: "<sp-icon-orientation-landscape>", story: (size) => html`<sp-icon-orientation-landscape size=${size}></sp-icon-orientation-landscape>` },
  { name: "Orientation portrait", tag: "<sp-icon-orientation-portrait>", story: (size) => html`<sp-icon-orientation-portrait size=${size}></sp-icon-orientation-portrait>` },
  { name: "Paste", tag: "<sp-icon-paste>", story: (size) => html`<sp-icon-paste size=${size}></sp-icon-paste>` },
  { name: "Path", tag: "<sp-icon-path>", story: (size) => html`<sp-icon-path size=${size}></sp-icon-path>` },
  { name: "Pattern", tag: "<sp-icon-pattern>", story: (size) => html`<sp-icon-pattern size=${size}></sp-icon-pattern>` },
  { name: "Pause circle", tag: "<sp-icon-pause-circle>", story: (size) => html`<sp-icon-pause-circle size=${size}></sp-icon-pause-circle>` },
  { name: "Pause", tag: "<sp-icon-pause>", story: (size) => html`<sp-icon-pause size=${size}></sp-icon-pause>` },
  { name: "Pen brush", tag: "<sp-icon-pen-brush>", story: (size) => html`<sp-icon-pen-brush size=${size}></sp-icon-pen-brush>` },
  { name: "People group", tag: "<sp-icon-people-group>", story: (size) => html`<sp-icon-people-group size=${size}></sp-icon-people-group>` },
  { name: "People", tag: "<sp-icon-people>", story: (size) => html`<sp-icon-people size=${size}></sp-icon-people>` },
  { name: "Percentage", tag: "<sp-icon-percentage>", story: (size) => html`<sp-icon-percentage size=${size}></sp-icon-percentage>` },
  { name: "Pin off", tag: "<sp-icon-pin-off>", story: (size) => html`<sp-icon-pin-off size=${size}></sp-icon-pin-off>` },
  { name: "Pin on", tag: "<sp-icon-pin-on>", story: (size) => html`<sp-icon-pin-on size=${size}></sp-icon-pin-on>` },
  { name: "Play", tag: "<sp-icon-play>", story: (size) => html`<sp-icon-play size=${size}></sp-icon-play>` },
  { name: "Plugin gear", tag: "<sp-icon-plugin-gear>", story: (size) => html`<sp-icon-plugin-gear size=${size}></sp-icon-plugin-gear>` },
  { name: "Plugin", tag: "<sp-icon-plugin>", story: (size) => html`<sp-icon-plugin size=${size}></sp-icon-plugin>` },
  { name: "Polygon3", tag: "<sp-icon-polygon3>", story: (size) => html`<sp-icon-polygon3 size=${size}></sp-icon-polygon3>` },
  { name: "Polygon4", tag: "<sp-icon-polygon4>", story: (size) => html`<sp-icon-polygon4 size=${size}></sp-icon-polygon4>` },
  { name: "Polygon5", tag: "<sp-icon-polygon5>", story: (size) => html`<sp-icon-polygon5 size=${size}></sp-icon-polygon5>` },
  { name: "Polygon6", tag: "<sp-icon-polygon6>", story: (size) => html`<sp-icon-polygon6 size=${size}></sp-icon-polygon6>` },
  { name: "Preview", tag: "<sp-icon-preview>", story: (size) => html`<sp-icon-preview size=${size}></sp-icon-preview>` },
  { name: "Print", tag: "<sp-icon-print>", story: (size) => html`<sp-icon-print size=${size}></sp-icon-print>` },
  { name: "Project add into", tag: "<sp-icon-project-add-into>", story: (size) => html`<sp-icon-project-add-into size=${size}></sp-icon-project-add-into>` },
  { name: "Project create", tag: "<sp-icon-project-create>", story: (size) => html`<sp-icon-project-create size=${size}></sp-icon-project-create>` },
  { name: "Project", tag: "<sp-icon-project>", story: (size) => html`<sp-icon-project size=${size}></sp-icon-project>` },
  { name: "Promote", tag: "<sp-icon-promote>", story: (size) => html`<sp-icon-promote size=${size}></sp-icon-promote>` },
  { name: "Prompt", tag: "<sp-icon-prompt>", story: (size) => html`<sp-icon-prompt size=${size}></sp-icon-prompt>` },
  { name: "Properties", tag: "<sp-icon-properties>", story: (size) => html`<sp-icon-properties size=${size}></sp-icon-properties>` },
  { name: "Prototyping", tag: "<sp-icon-prototyping>", story: (size) => html`<sp-icon-prototyping size=${size}></sp-icon-prototyping>` },
  { name: "Publish no", tag: "<sp-icon-publish-no>", story: (size) => html`<sp-icon-publish-no size=${size}></sp-icon-publish-no>` },
  { name: "Publish", tag: "<sp-icon-publish>", story: (size) => html`<sp-icon-publish size=${size}></sp-icon-publish>` },
  { name: "Radio button", tag: "<sp-icon-radio-button>", story: (size) => html`<sp-icon-radio-button size=${size}></sp-icon-radio-button>` },
  { name: "Rectangle horiz", tag: "<sp-icon-rectangle-horiz>", story: (size) => html`<sp-icon-rectangle-horiz size=${size}></sp-icon-rectangle-horiz>` },
  { name: "Redo", tag: "<sp-icon-redo>", story: (size) => html`<sp-icon-redo size=${size}></sp-icon-redo>` },
  { name: "Refresh", tag: "<sp-icon-refresh>", story: (size) => html`<sp-icon-refresh size=${size}></sp-icon-refresh>` },
  { name: "Remove circle", tag: "<sp-icon-remove-circle>", story: (size) => html`<sp-icon-remove-circle size=${size}></sp-icon-remove-circle>` },
  { name: "Rename", tag: "<sp-icon-rename>", story: (size) => html`<sp-icon-rename size=${size}></sp-icon-rename>` },
  { name: "Replace", tag: "<sp-icon-replace>", story: (size) => html`<sp-icon-replace size=${size}></sp-icon-replace>` },
  { name: "Report abuse", tag: "<sp-icon-report-abuse>", story: (size) => html`<sp-icon-report-abuse size=${size}></sp-icon-report-abuse>` },
  { name: "Resize", tag: "<sp-icon-resize>", story: (size) => html`<sp-icon-resize size=${size}></sp-icon-resize>` },
  { name: "Revert", tag: "<sp-icon-revert>", story: (size) => html`<sp-icon-revert size=${size}></sp-icon-revert>` },
  { name: "Review link", tag: "<sp-icon-review-link>", story: (size) => html`<sp-icon-review-link size=${size}></sp-icon-review-link>` },
  { name: "Ribbon", tag: "<sp-icon-ribbon>", story: (size) => html`<sp-icon-ribbon size=${size}></sp-icon-ribbon>` },
  { name: "Rocket quick actions", tag: "<sp-icon-rocket-quick-actions>", story: (size) => html`<sp-icon-rocket-quick-actions size=${size}></sp-icon-rocket-quick-actions>` },
  { name: "Rotate cc w", tag: "<sp-icon-rotate-cc-w>", story: (size) => html`<sp-icon-rotate-cc-w size=${size}></sp-icon-rotate-cc-w>` },
  { name: "Rotate c w", tag: "<sp-icon-rotate-c-w>", story: (size) => html`<sp-icon-rotate-c-w size=${size}></sp-icon-rotate-c-w>` },
  { name: "Rotate orientation", tag: "<sp-icon-rotate-orientation>", story: (size) => html`<sp-icon-rotate-orientation size=${size}></sp-icon-rotate-orientation>` },
  { name: "Ruler", tag: "<sp-icon-ruler>", story: (size) => html`<sp-icon-ruler size=${size}></sp-icon-ruler>` },
  { name: "Saturation", tag: "<sp-icon-saturation>", story: (size) => html`<sp-icon-saturation size=${size}></sp-icon-saturation>` },
  { name: "Save floppy", tag: "<sp-icon-save-floppy>", story: (size) => html`<sp-icon-save-floppy size=${size}></sp-icon-save-floppy>` },
  { name: "Search", tag: "<sp-icon-search>", story: (size) => html`<sp-icon-search size=${size}></sp-icon-search>` },
  { name: "Select all items", tag: "<sp-icon-select-all-items>", story: (size) => html`<sp-icon-select-all-items size=${size}></sp-icon-select-all-items>` },
  { name: "Select and move", tag: "<sp-icon-select-and-move>", story: (size) => html`<sp-icon-select-and-move size=${size}></sp-icon-select-and-move>` },
  { name: "Select multi", tag: "<sp-icon-select-multi>", story: (size) => html`<sp-icon-select-multi size=${size}></sp-icon-select-multi>` },
  { name: "Select no", tag: "<sp-icon-select-no>", story: (size) => html`<sp-icon-select-no size=${size}></sp-icon-select-no>` },
  { name: "Select none", tag: "<sp-icon-select-none>", story: (size) => html`<sp-icon-select-none size=${size}></sp-icon-select-none>` },
  { name: "Select rectangle", tag: "<sp-icon-select-rectangle>", story: (size) => html`<sp-icon-select-rectangle size=${size}></sp-icon-select-rectangle>` },
  { name: "Select", tag: "<sp-icon-select>", story: (size) => html`<sp-icon-select size=${size}></sp-icon-select>` },
  { name: "Send", tag: "<sp-icon-send>", story: (size) => html`<sp-icon-send size=${size}></sp-icon-send>` },
  { name: "Settings", tag: "<sp-icon-settings>", story: (size) => html`<sp-icon-settings size=${size}></sp-icon-settings>` },
  { name: "Shapes", tag: "<sp-icon-shapes>", story: (size) => html`<sp-icon-shapes size=${size}></sp-icon-shapes>` },
  { name: "Share android", tag: "<sp-icon-share-android>", story: (size) => html`<sp-icon-share-android size=${size}></sp-icon-share-android>` },
  { name: "Share", tag: "<sp-icon-share>", story: (size) => html`<sp-icon-share size=${size}></sp-icon-share>` },
  { name: "Shopping cart", tag: "<sp-icon-shopping-cart>", story: (size) => html`<sp-icon-shopping-cart size=${size}></sp-icon-shopping-cart>` },
  { name: "Shuffle", tag: "<sp-icon-shuffle>", story: (size) => html`<sp-icon-shuffle size=${size}></sp-icon-shuffle>` },
  { name: "Similar", tag: "<sp-icon-similar>", story: (size) => html`<sp-icon-similar size=${size}></sp-icon-similar>` },
  { name: "Slideshow", tag: "<sp-icon-slideshow>", story: (size) => html`<sp-icon-slideshow size=${size}></sp-icon-slideshow>` },
  { name: "Slow connection circle", tag: "<sp-icon-slow-connection-circle>", story: (size) => html`<sp-icon-slow-connection-circle size=${size}></sp-icon-slow-connection-circle>` },
  { name: "Social network", tag: "<sp-icon-social-network>", story: (size) => html`<sp-icon-social-network size=${size}></sp-icon-social-network>` },
  { name: "Sort down", tag: "<sp-icon-sort-down>", story: (size) => html`<sp-icon-sort-down size=${size}></sp-icon-sort-down>` },
  { name: "Sort up", tag: "<sp-icon-sort-up>", story: (size) => html`<sp-icon-sort-up size=${size}></sp-icon-sort-up>` },
  { name: "Sort", tag: "<sp-icon-sort>", story: (size) => html`<sp-icon-sort size=${size}></sp-icon-sort>` },
  { name: "Speed fast", tag: "<sp-icon-speed-fast>", story: (size) => html`<sp-icon-speed-fast size=${size}></sp-icon-speed-fast>` },
  { name: "Stamp clone", tag: "<sp-icon-stamp-clone>", story: (size) => html`<sp-icon-stamp-clone size=${size}></sp-icon-stamp-clone>` },
  { name: "Star filled", tag: "<sp-icon-star-filled>", story: (size) => html`<sp-icon-star-filled size=${size}></sp-icon-star-filled>` },
  { name: "Star", tag: "<sp-icon-star>", story: (size) => html`<sp-icon-star size=${size}></sp-icon-star>` },
  { name: "Step backward", tag: "<sp-icon-step-backward>", story: (size) => html`<sp-icon-step-backward size=${size}></sp-icon-step-backward>` },
  { name: "Step forward", tag: "<sp-icon-step-forward>", story: (size) => html`<sp-icon-step-forward size=${size}></sp-icon-step-forward>` },
  { name: "Sticky note", tag: "<sp-icon-sticky-note>", story: (size) => html`<sp-icon-sticky-note size=${size}></sp-icon-sticky-note>` },
  { name: "Stroke dotted", tag: "<sp-icon-stroke-dotted>", story: (size) => html`<sp-icon-stroke-dotted size=${size}></sp-icon-stroke-dotted>` },
  { name: "Stroke solid", tag: "<sp-icon-stroke-solid>", story: (size) => html`<sp-icon-stroke-solid size=${size}></sp-icon-stroke-solid>` },
  { name: "Stroke width", tag: "<sp-icon-stroke-width>", story: (size) => html`<sp-icon-stroke-width size=${size}></sp-icon-stroke-width>` },
  { name: "Switch vertical", tag: "<sp-icon-switch-vertical>", story: (size) => html`<sp-icon-switch-vertical size=${size}></sp-icon-switch-vertical>` },
  { name: "Switch", tag: "<sp-icon-switch>", story: (size) => html`<sp-icon-switch size=${size}></sp-icon-switch>` },
  { name: "Table", tag: "<sp-icon-table>", story: (size) => html`<sp-icon-table size=${size}></sp-icon-table>` },
  { name: "Tag", tag: "<sp-icon-tag>", story: (size) => html`<sp-icon-tag size=${size}></sp-icon-tag>` },
  { name: "Target", tag: "<sp-icon-target>", story: (size) => html`<sp-icon-target size=${size}></sp-icon-target>` },
  { name: "Temperature", tag: "<sp-icon-temperature>", story: (size) => html`<sp-icon-temperature size=${size}></sp-icon-temperature>` },
  { name: "Template", tag: "<sp-icon-template>", story: (size) => html`<sp-icon-template size=${size}></sp-icon-template>` },
  { name: "Text add", tag: "<sp-icon-text-add>", story: (size) => html`<sp-icon-text-add size=${size}></sp-icon-text-add>` },
  { name: "Text align center", tag: "<sp-icon-text-align-center>", story: (size) => html`<sp-icon-text-align-center size=${size}></sp-icon-text-align-center>` },
  { name: "Text align justify last center", tag: "<sp-icon-text-align-justify-last-center>", story: (size) => html`<sp-icon-text-align-justify-last-center size=${size}></sp-icon-text-align-justify-last-center>` },
  { name: "Text align justify last left", tag: "<sp-icon-text-align-justify-last-left>", story: (size) => html`<sp-icon-text-align-justify-last-left size=${size}></sp-icon-text-align-justify-last-left>` },
  { name: "Text align justify last right", tag: "<sp-icon-text-align-justify-last-right>", story: (size) => html`<sp-icon-text-align-justify-last-right size=${size}></sp-icon-text-align-justify-last-right>` },
  { name: "Text align justify", tag: "<sp-icon-text-align-justify>", story: (size) => html`<sp-icon-text-align-justify size=${size}></sp-icon-text-align-justify>` },
  { name: "Text align left", tag: "<sp-icon-text-align-left>", story: (size) => html`<sp-icon-text-align-left size=${size}></sp-icon-text-align-left>` },
  { name: "Text align right", tag: "<sp-icon-text-align-right>", story: (size) => html`<sp-icon-text-align-right size=${size}></sp-icon-text-align-right>` },
  { name: "Text bold", tag: "<sp-icon-text-bold>", story: (size) => html`<sp-icon-text-bold size=${size}></sp-icon-text-bold>` },
  { name: "Text caps all", tag: "<sp-icon-text-caps-all>", story: (size) => html`<sp-icon-text-caps-all size=${size}></sp-icon-text-caps-all>` },
  { name: "Text caps small", tag: "<sp-icon-text-caps-small>", story: (size) => html`<sp-icon-text-caps-small size=${size}></sp-icon-text-caps-small>` },
  { name: "Text highlight", tag: "<sp-icon-text-highlight>", story: (size) => html`<sp-icon-text-highlight size=${size}></sp-icon-text-highlight>` },
  { name: "Text increase", tag: "<sp-icon-text-increase>", story: (size) => html`<sp-icon-text-increase size=${size}></sp-icon-text-increase>` },
  { name: "Text italic", tag: "<sp-icon-text-italic>", story: (size) => html`<sp-icon-text-italic size=${size}></sp-icon-text-italic>` },
  { name: "Text numbers", tag: "<sp-icon-text-numbers>", story: (size) => html`<sp-icon-text-numbers size=${size}></sp-icon-text-numbers>` },
  { name: "Text paragraph", tag: "<sp-icon-text-paragraph>", story: (size) => html`<sp-icon-text-paragraph size=${size}></sp-icon-text-paragraph>` },
  { name: "Text replace comment", tag: "<sp-icon-text-replace-comment>", story: (size) => html`<sp-icon-text-replace-comment size=${size}></sp-icon-text-replace-comment>` },
  { name: "Text size", tag: "<sp-icon-text-size>", story: (size) => html`<sp-icon-text-size size=${size}></sp-icon-text-size>` },
  { name: "Text strikethrough", tag: "<sp-icon-text-strikethrough>", story: (size) => html`<sp-icon-text-strikethrough size=${size}></sp-icon-text-strikethrough>` },
  { name: "Text subscript", tag: "<sp-icon-text-subscript>", story: (size) => html`<sp-icon-text-subscript size=${size}></sp-icon-text-subscript>` },
  { name: "Text superscript", tag: "<sp-icon-text-superscript>", story: (size) => html`<sp-icon-text-superscript size=${size}></sp-icon-text-superscript>` },
  { name: "Text underline", tag: "<sp-icon-text-underline>", story: (size) => html`<sp-icon-text-underline size=${size}></sp-icon-text-underline>` },
  { name: "Text variable font settings", tag: "<sp-icon-text-variable-font-settings>", story: (size) => html`<sp-icon-text-variable-font-settings size=${size}></sp-icon-text-variable-font-settings>` },
  { name: "Text", tag: "<sp-icon-text>", story: (size) => html`<sp-icon-text size=${size}></sp-icon-text>` },
  { name: "Thumb down", tag: "<sp-icon-thumb-down>", story: (size) => html`<sp-icon-thumb-down size=${size}></sp-icon-thumb-down>` },
  { name: "Thumb up", tag: "<sp-icon-thumb-up>", story: (size) => html`<sp-icon-thumb-up size=${size}></sp-icon-thumb-up>` },
  { name: "Toggle", tag: "<sp-icon-toggle>", story: (size) => html`<sp-icon-toggle size=${size}></sp-icon-toggle>` },
  { name: "Tools", tag: "<sp-icon-tools>", story: (size) => html`<sp-icon-tools size=${size}></sp-icon-tools>` },
  { name: "Touch one finger swipe left right", tag: "<sp-icon-touch-one-finger-swipe-left-right>", story: (size) => html`<sp-icon-touch-one-finger-swipe-left-right size=${size}></sp-icon-touch-one-finger-swipe-left-right>` },
  { name: "Transcript", tag: "<sp-icon-transcript>", story: (size) => html`<sp-icon-transcript size=${size}></sp-icon-transcript>` },
  { name: "Transform distort", tag: "<sp-icon-transform-distort>", story: (size) => html`<sp-icon-transform-distort size=${size}></sp-icon-transform-distort>` },
  { name: "Transform generic", tag: "<sp-icon-transform-generic>", story: (size) => html`<sp-icon-transform-generic size=${size}></sp-icon-transform-generic>` },
  { name: "Transform perspective", tag: "<sp-icon-transform-perspective>", story: (size) => html`<sp-icon-transform-perspective size=${size}></sp-icon-transform-perspective>` },
  { name: "Transform skew", tag: "<sp-icon-transform-skew>", story: (size) => html`<sp-icon-transform-skew size=${size}></sp-icon-transform-skew>` },
  { name: "Transform warp", tag: "<sp-icon-transform-warp>", story: (size) => html`<sp-icon-transform-warp size=${size}></sp-icon-transform-warp>` },
  { name: "Translate", tag: "<sp-icon-translate>", story: (size) => html`<sp-icon-translate size=${size}></sp-icon-translate>` },
  { name: "Tutorials", tag: "<sp-icon-tutorials>", story: (size) => html`<sp-icon-tutorials size=${size}></sp-icon-tutorials>` },
  { name: "Unlink", tag: "<sp-icon-unlink>", story: (size) => html`<sp-icon-unlink size=${size}></sp-icon-unlink>` },
  { name: "Undo", tag: "<sp-icon-undo>", story: (size) => html`<sp-icon-undo size=${size}></sp-icon-undo>` },
  { name: "Unlink horiz", tag: "<sp-icon-unlink-horiz>", story: (size) => html`<sp-icon-unlink-horiz size=${size}></sp-icon-unlink-horiz>` },
  { name: "Unlink vertical", tag: "<sp-icon-unlink-vertical>", story: (size) => html`<sp-icon-unlink-vertical size=${size}></sp-icon-unlink-vertical>` },
  { name: "Upload to cloud", tag: "<sp-icon-upload-to-cloud>", story: (size) => html`<sp-icon-upload-to-cloud size=${size}></sp-icon-upload-to-cloud>` },
  { name: "Upload", tag: "<sp-icon-upload>", story: (size) => html`<sp-icon-upload size=${size}></sp-icon-upload>` },
  { name: "User add", tag: "<sp-icon-user-add>", story: (size) => html`<sp-icon-user-add size=${size}></sp-icon-user-add>` },
  { name: "User avatar cursor", tag: "<sp-icon-user-avatar-cursor>", story: (size) => html`<sp-icon-user-avatar-cursor size=${size}></sp-icon-user-avatar-cursor>` },
  { name: "User avatar", tag: "<sp-icon-user-avatar>", story: (size) => html`<sp-icon-user-avatar size=${size}></sp-icon-user-avatar>` },
  { name: "User edit", tag: "<sp-icon-user-edit>", story: (size) => html`<sp-icon-user-edit size=${size}></sp-icon-user-edit>` },
  { name: "User following", tag: "<sp-icon-user-following>", story: (size) => html`<sp-icon-user-following size=${size}></sp-icon-user-following>` },
  { name: "User group", tag: "<sp-icon-user-group>", story: (size) => html`<sp-icon-user-group size=${size}></sp-icon-user-group>` },
  { name: "User lock", tag: "<sp-icon-user-lock>", story: (size) => html`<sp-icon-user-lock size=${size}></sp-icon-user-lock>` },
  { name: "User settings", tag: "<sp-icon-user-settings>", story: (size) => html`<sp-icon-user-settings size=${size}></sp-icon-user-settings>` },
  { name: "User", tag: "<sp-icon-user>", story: (size) => html`<sp-icon-user size=${size}></sp-icon-user>` },
  { name: "Users lock", tag: "<sp-icon-users-lock>", story: (size) => html`<sp-icon-users-lock size=${size}></sp-icon-users-lock>` },
  { name: "Vector draw", tag: "<sp-icon-vector-draw>", story: (size) => html`<sp-icon-vector-draw size=${size}></sp-icon-vector-draw>` },
  { name: "Video", tag: "<sp-icon-video>", story: (size) => html`<sp-icon-video size=${size}></sp-icon-video>` },
  { name: "View grid fluid", tag: "<sp-icon-view-grid-fluid>", story: (size) => html`<sp-icon-view-grid-fluid size=${size}></sp-icon-view-grid-fluid>` },
  { name: "View grid", tag: "<sp-icon-view-grid>", story: (size) => html`<sp-icon-view-grid size=${size}></sp-icon-view-grid>` },
  { name: "View list", tag: "<sp-icon-view-list>", story: (size) => html`<sp-icon-view-list size=${size}></sp-icon-view-list>` },
  { name: "View transparency", tag: "<sp-icon-view-transparency>", story: (size) => html`<sp-icon-view-transparency size=${size}></sp-icon-view-transparency>` },
  { name: "Visibility off", tag: "<sp-icon-visibility-off>", story: (size) => html`<sp-icon-visibility-off size=${size}></sp-icon-visibility-off>` },
  { name: "Visibility", tag: "<sp-icon-visibility>", story: (size) => html`<sp-icon-visibility size=${size}></sp-icon-visibility>` },
  { name: "Volume off", tag: "<sp-icon-volume-off>", story: (size) => html`<sp-icon-volume-off size=${size}></sp-icon-volume-off>` },
  { name: "Volume one", tag: "<sp-icon-volume-one>", story: (size) => html`<sp-icon-volume-one size=${size}></sp-icon-volume-one>` },
  { name: "Volume two", tag: "<sp-icon-volume-two>", story: (size) => html`<sp-icon-volume-two size=${size}></sp-icon-volume-two>` },
  { name: "Web nav bar", tag: "<sp-icon-web-nav-bar>", story: (size) => html`<sp-icon-web-nav-bar size=${size}></sp-icon-web-nav-bar>` },
  { name: "Web page", tag: "<sp-icon-web-page>", story: (size) => html`<sp-icon-web-page size=${size}></sp-icon-web-page>` },
  { name: "Zoom in", tag: "<sp-icon-zoom-in>", story: (size) => html`<sp-icon-zoom-in size=${size}></sp-icon-zoom-in>` },
  { name: "Zoom out", tag: "<sp-icon-zoom-out>", story: (size) => html`<sp-icon-zoom-out size=${size}></sp-icon-zoom-out>` }
];
//# sourceMappingURL=icon-manifest.js.map

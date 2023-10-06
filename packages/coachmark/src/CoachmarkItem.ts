/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

export type CoachmarkItem = {
    id?: string;
    heading: string;
    shortcutKey?: string;
    modifierKeys?: string[];
    content: string;
    src?: string;
    imageAlt?: string;
    mediaType?: string;
    videoType?: string;
    toolVideoData?: string;
    currentStep?: number;
    totalSteps?: number;
    hasActionMenu?: boolean;
    primaryCTA?: string;
    secondaryCTA?: string;
};

export enum VideoType {
    WEBM = 'video/webm',
    MP4 = 'video/mp4',
}

export enum MediaType {
    IMAGE = 'image',
    VIDEO = 'video',
}

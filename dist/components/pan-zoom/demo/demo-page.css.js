/*
Copyright 2018 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
export default /* css */ `
.demo{margin:0;height:500px;background-color:var(--demo-section-demo-bg-color,#eee)}.demo-single,.demo>*{background-color:#fff;box-shadow:0 0 10px rgba(0,0,0,.1);border-radius:4px}.demo-single{width:500px}.demo-pair{grid-template-columns:1fr 1fr;grid-column-gap:16px}.demo-grid,.demo-pair{width:100%;display:grid}.demo-grid{height:1200px;grid-template-columns:1fr 1fr 1fr;grid-template-rows:1fr 1fr 1fr;grid-column-gap:10px;grid-row-gap:10px}.demo-flex{width:100%;height:500px;overflow:hidden;display:flex;flex-direction:row;align-items:center;justify-content:center}.demo-flex>*{margin:5px;box-sizing:border-box;height:100%}.demo-deep{width:100%;height:600px;background-color:#fff}
`;

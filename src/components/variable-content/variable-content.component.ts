import {ChangeDetectionStrategy, Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'jaspero-variable-content',
  templateUrl: './variable-content.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VariableContentComponent {
  @Input() isTemplate = false;
  @Input() item: string | TemplateRef<any>;
}

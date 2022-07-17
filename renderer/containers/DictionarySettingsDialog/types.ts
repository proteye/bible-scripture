export interface IDictionarySettingsDialogProps {
  isVisible: boolean
  onCloseTabs?(moduleName: string): void
  onClose?(): void
}

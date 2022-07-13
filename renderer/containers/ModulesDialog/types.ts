export interface IModulesDialogProps {
  isVisible: boolean
  onCloseTabs?(moduleName: string): void
  onClose?(): void
}

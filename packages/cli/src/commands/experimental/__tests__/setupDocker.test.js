import { recordTelemetryAttributes } from '@redwoodjs/cli-helpers'

import { command, description, builder, handler } from '../setupDocker'

jest.mock('../setupDockerHandler.js')

jest.mock('@redwoodjs/cli-helpers', () => {
  return {
    recordTelemetryAttributes: jest.fn(),
  }
})

describe('setupDocker', () => {
  test("command didn't change unintentionally", () => {
    expect(command).toMatchInlineSnapshot(`"setup-docker"`)
  })

  test("description didn't change unintentionally", () => {
    expect(description).toMatchInlineSnapshot(
      `"Setup the experimental Dockerfile"`
    )
  })

  test('builder configures command options force and verbose ', () => {
    const yargs = {
      option: jest.fn(() => yargs),
      epilogue: jest.fn(() => yargs),
    }

    builder(yargs)

    expect(yargs.option.mock.calls[0][0]).toMatchInlineSnapshot(`"force"`)
    expect(yargs.option.mock.calls[0][1]).toMatchInlineSnapshot(`
      {
        "alias": "f",
        "default": false,
        "description": "Overwrite existing configuration",
        "type": "boolean",
      }
    `)

    expect(yargs.option.mock.calls[1][0]).toMatchInlineSnapshot(`"verbose"`)
    expect(yargs.option.mock.calls[1][1]).toMatchInlineSnapshot(`
      {
        "alias": "v",
        "default": false,
        "description": "Print more logs",
        "type": "boolean",
      }
    `)

    expect(yargs.epilogue.mock.calls[0][0]).toMatchInlineSnapshot(`
      "This is an experimental feature to: Setup the experimental Dockerfile.

      Please find documentation and links to provide feedback for setup-docker at:
       -> https://community.redwoodjs.com/t/null (​https://community.redwoodjs.com/t/null​)"
    `)
  })

  test('the handler calls recordTelemetryAttributes', async () => {
    await handler({})

    expect(recordTelemetryAttributes).toHaveBeenCalledWith({
      command: 'experimental setup-docker',
      force: undefined,
      verbose: undefined,
    })
  })
})

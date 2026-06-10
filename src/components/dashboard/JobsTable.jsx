"use client";

import { Table, Button, Chip } from "@heroui/react";
import { Eye, Pencil, TrashBin } from "@gravity-ui/icons";
import { useRouter } from "next/navigation";

const statusColorMap = {
  active: "success",
  draft: "warning",
  closed: "danger",
};

export default function JobsTable({ jobs = [] }) {
  const router = useRouter();

  return (
    <Table>
      <Table.ScrollContainer>
        <Table.Content
          aria-label="Recruiter Jobs Table"
          className="min-w-225"
        >
          <Table.Header>
            <Table.Column>
              Title
            </Table.Column>

            <Table.Column className="hidden md:table-cell">
              Category
            </Table.Column>

            <Table.Column className="hidden lg:table-cell">
              Location
            </Table.Column>

            <Table.Column>
              Status
            </Table.Column>

            <Table.Column className="text-end">
              Actions
            </Table.Column>
          </Table.Header>

          <Table.Body>
            {jobs.map((job) => (
              <Table.Row
                key={job._id}
                id={job._id}
              >
                <Table.Cell>
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {job.title}
                    </span>

                    <span className="text-xs text-muted">
                      {job.type}
                    </span>
                  </div>
                </Table.Cell>

                <Table.Cell className="hidden md:table-cell capitalize">
                  {job.category}
                </Table.Cell>

                <Table.Cell className="hidden lg:table-cell">
                  {job.isRemote
                    ? "Remote"
                    : `${job.city}, ${job.country}`}
                </Table.Cell>

                <Table.Cell>
                  <Chip
                    size="sm"
                    variant="soft"
                    color={
                      statusColorMap[job.status] ||
                      "default"
                    }
                  >
                    {job.status}
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex justify-end gap-1">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="tertiary"
                      onPress={() =>
                        router.push(
                          `/dashboard/recruiter/jobs/${job._id}`
                        )
                      }
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    <Button
                      isIconOnly
                      size="sm"
                      variant="tertiary"
                      onPress={() =>
                        router.push(
                          `/dashboard/recruiter/jobs/edit/${job._id}`
                        )
                      }
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>

                    <Button
                      isIconOnly
                      size="sm"
                      variant="danger-soft"
                      onPress={() =>
                        console.log(
                          "Delete",
                          job._id
                        )
                      }
                    >
                      <TrashBin className="h-4 w-4" />
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}

